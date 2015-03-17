package utils

import (
  "log"
  "labix.org/v2/mgo"
  "github.com/julienschmidt/httprouter"
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

type App struct {
  Session *mgo.Session
  Router *httprouter.Router
}

func CreateApp() App {
  app := App{
    Session: CreateMongoSession(),
    Router: Router(),
  }
  return app
}
