package main

import (
  "os"
  "github.com/codegangsta/negroni"
  "github.com/kbingman/ragnar-anchorage/go/app"
)

func main() {
  app := app.CreateApp()
  port := os.Getenv("PORT")

  defer app.Session.Close()

  n := negroni.Classic()
  n.UseHandler(app.Router)
  n.Run(":" + port)
}
