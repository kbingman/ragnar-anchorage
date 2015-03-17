package app

import (
  "net/http"
  "fmt"
  "path"
  "os"
  "github.com/julienschmidt/httprouter"
  "github.com/hoisie/mustache"
)

func RenderHTML(template string, context map[string]interface{}) string {
  layoutPath := "templates/layout.hogan"
  filename := path.Join(path.Join(os.Getenv("PWD"), "templates"), template + ".hogan")
  return mustache.RenderFileInLayout(filename, layoutPath, context)
}

func RenderCanvas(w http.ResponseWriter, req *http.Request, params httprouter.Params) {
  context := map[string]interface{}{
    "title": "Sector Map",
  }

  w.Header().Set("Content-Type", "text/html")
  fmt.Fprint(w, RenderHTML("canvas", context))
}
