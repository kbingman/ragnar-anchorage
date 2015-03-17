package api

import (
  "log"
  "net/http"
  "encoding/json"
  // "labix.org/v2/mgo"
  "labix.org/v2/mgo/bson"
  "github.com/julienschmidt/httprouter"
  "github.com/kbingman/full-of-stars/go/utils"
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

func GetAllStarships(res http.ResponseWriter, req *http.Request, _ httprouter.Params) {

  // Let's build up the starships slice
  var starships []Starship

  log.Println("collection")

  collection := utils.ReturnStarshipsCollection()
  // collection := starshipsdb.C("starships")
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
