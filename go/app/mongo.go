package app

import (
  "log"
  "os"
  "labix.org/v2/mgo"
)

// Set this in a config
func ReturnStarshipsCollection() *mgo.Collection {
  log.Println("Finding Starships")
  collection := app.Session.DB("Starships").C("starships")
  return collection
}

func CreateMongoSession() *mgo.Session {
  log.Println("Starting mongo db session")
  session, err := mgo.Dial(os.Getenv("MONGO_URL"))

  if err != nil { panic (err) }

  session.SetMode(mgo.Monotonic, true)
  return session
}
