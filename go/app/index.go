package app

import (
  "labix.org/v2/mgo"
  "github.com/julienschmidt/httprouter"
)

var (
  app App
)

type App struct {
  Session *mgo.Session
  Router *httprouter.Router
}

func CreateApp() App {
  app = App{
    Session: CreateMongoSession(),
    Router: Router(),
  }
  return app
}

func ReturnApp() App {
  return app
}
