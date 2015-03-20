package app

import (
  "log"
  "net/http"
  "encoding/json"
  "labix.org/v2/mgo/bson"
  "github.com/julienschmidt/httprouter"
)

func GetAllStarships(res http.ResponseWriter, req *http.Request, _ httprouter.Params) {
  var starships []Starship

  collection := app.Session.DB("Starships").C("starships")
  iter := collection.Find(nil).Iter()
  result := Starship{}

  for iter.Next(&result) {
      starships = append(starships, result)
  }

  res.Header().Set("Content-Type", "application/json")
  json, err := json.Marshal(StarshipsJSON{Starships: starships})
  if err != nil { panic (err) }
  res.Write(json)
}

func GetStarship(res http.ResponseWriter, req *http.Request, params httprouter.Params) {
  var starship Starship

  id := bson.ObjectIdHex(params.ByName("id"))
  collection := app.Session.DB("Starships").C("starships")
  err := collection.Find(bson.M{ "_id":id }).One(&starship)
  if err != nil { panic (err) }

  res.Header().Set("Content-Type", "application/json")
  json, err := json.Marshal(StarshipJSON{Starship: starship})
  if err != nil { panic (err) }
  res.Write(json)
}

func updateStarship(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
  var err error
  var starshipJSON StarshipJSON

  // Grab the starship's id from the incoming url
  id := bson.ObjectIdHex(params.ByName("id"))
  collection := app.Session.DB("Starships").C("starships")

  err = json.NewDecoder(r.Body).Decode(&starshipJSON)
  if err != nil {panic(err)}

  starship := starshipJSON.Starship
  starship.Id = id

  // Update the database
  err = collection.Update(bson.M{"_id":id}, starshipJSON.Starship)
  if err == nil {
    log.Printf("Updated starship %s name to %s", id, starshipJSON.Starship.Name)
  } else {
    panic(err)
  }

  json, err := json.Marshal(StarshipJSON{Starship: starship})
  if err != nil { panic(err) }
  w.Header().Set("Content-Type", "application/json")
  w.Write(json)
}
