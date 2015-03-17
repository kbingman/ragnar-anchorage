package app

import (
  "log"
  "net/http"
  "encoding/json"
  "github.com/julienschmidt/httprouter"
)

func GetAllStarships(res http.ResponseWriter, req *http.Request, _ httprouter.Params) {

  // Let's build up the starships slice
  var starships []Starship

  log.Println("collection")

  collection := ReturnStarshipsCollection()
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
