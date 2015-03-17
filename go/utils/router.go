package utils

import (
  "github.com/julienschmidt/httprouter"
  "github.com/kbingman/ragnar-anchorage/go/api"
)

func Router() *httprouter.Router {
  router := httprouter.New()

  // HTML Routes
  router.GET("/", RenderCanvas)
  router.GET("/ships/:id", RenderCanvas)
  router.GET("/tactical", RenderCanvas)

  // JSON API routes
  router.GET("/api/v1/ships", api.GetAllStarships)
  // router.POST("/api/ships", createStarship)
  // router.DELETE("/api/ships/:id", deleteStarship)
  // router.PUT("/api/ships/:id", updateStarship)

  return router
}
