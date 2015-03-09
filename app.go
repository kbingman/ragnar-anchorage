package main

import (
  "net/http"
  "fmt"
  "log"
  "path"
  "os"
  "encoding/json"
  "github.com/codegangsta/negroni"
  "github.com/julienschmidt/httprouter"
  "github.com/hoisie/mustache"
  "labix.org/v2/mgo"
  "labix.org/v2/mgo/bson"
)

var (
  session *mgo.Session
  collection *mgo.Collection
)

type Weapon struct {
  Id int `json:"id"`
  Name string `json:"name"`
  Cost float32 `json:"cost"`
  Ep float32 `json:"ep"`
  Mass float32 `json:"mass"`
  // RequiredTechLevel int
}

type Battery struct {
  Id int `json:"id"`
  Name string `json:"name"`
  Count int `json:"count"`
  Cost float32  `json:"cost"`
  Ep float32 `json:"ep"`
  Mass float32 `json:"mass"`
  // EnergyPoints int `json:"energyPoints"`
}

type Configuration struct {
  Id int `json:"id"`
  Name string `json:"name"`
  Cost float32 `json:"cost"`
  Selected bool `json:"selected"`
}

type Starship struct {
  Id bson.ObjectId `bson:"_id" json:"id"`
  Uuid string `json:"uuid"`
  Name string `json:"name"`
  Configuration string `json:"configuration"`
  Armor float32 `json:"armor"`
  Mass int64 `json:"mass"`
  Thrust int64 `json:"thrust"`
  Ep float32 `json:"ep"`
  Reactor int64 `json:"reactor"`
  Price float32 `json:"price"`
  Ftl int64 `json:"ftl"`
  Passengers int64 `json:"passengers"`
  Troops int64 `json:"troops"`
  PrimaryWeapons []Battery `json:"primaryWeapons"`
  PointDefenseWeapons []Battery `json:"pointDefenseWeapons"`
  BatteryWeapons []Battery `json:"batteryWeapons"`
  SmallCraft []Starship `json:"smallCraft"`
}

type StarshipJSON struct {
  Starship Starship `json:"starship"`
}

type StarshipsJSON struct {
  Starships []Starship `json:"starships"`
}

func getAllStarships(res http.ResponseWriter, req *http.Request, _ httprouter.Params) {

    // Let's build up the starships slice
    var starships []Starship

    iter := collection.Find(nil).Iter()
    result := Starship{}
    for iter.Next(&result) {
        starships = append(starships, result)
    }

    res.Header().Set("Content-Type", "application/json")
    json, err := json.Marshal(StarshipsJSON{Starships: starships})
    if err != nil { panic (err) }
    res.Write(json)
    log.Println("Provided json")

}

func renderHTML(template string, context map[string]interface{}) string {
  layoutPath := "templates/layout.hogan"
  filename := path.Join(path.Join(os.Getenv("PWD"), "templates"), template + ".hogan")
  return mustache.RenderFileInLayout(filename, layoutPath, context)
}

func renderCanvas(w http.ResponseWriter, req *http.Request, params httprouter.Params) {
  context := map[string]interface{}{
    "title": "Sector Map",
  }

  w.Header().Set("Content-Type", "text/html")
  fmt.Fprint(w, renderHTML("canvas", context))
}

func main() {
  port := os.Getenv("PORT")
  router := httprouter.New()
  // session := utils.CreateMongoSession()

  // HTML Routes
  router.GET("/", renderCanvas)
  router.GET("/ships/:id", renderCanvas)

  // JSON API routes
  router.GET("/api/v1/ships", getAllStarships)

  // log.Println("Starting mongo db session")
  var err error
  session, err = mgo.Dial("localhost")
  if err != nil { panic (err) }
  defer session.Close()
  session.SetMode(mgo.Monotonic, true)
  collection = session.DB("Starships").C("starships")

  n := negroni.Classic()
  n.UseHandler(router)
  n.Run(":" + port)
}
