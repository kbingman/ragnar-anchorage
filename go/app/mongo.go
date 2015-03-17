package app

import (
  "log"
  "labix.org/v2/mgo"
)

var (
  session *mgo.Session
  collection *mgo.Collection
)

// Set this in a config
func ReturnStarshipsCollection() *mgo.Collection {
  log.Println("Finding Starships")
  collection = session.DB("Starships").C("starships")
  return collection
}

func CreateMongoSession()  *mgo.Session {
  log.Println("Starting mongo db session")
  var err error
  // session, err = mgo.Dial(os.Getenv("MONGO_URL"))
  session, err = mgo.Dial("localhost")
  if err != nil { panic (err) }

  session.SetMode(mgo.Monotonic, true)
  return session
}
