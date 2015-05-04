package app

import (
  "github.com/julienschmidt/httprouter"
)

func Router() *httprouter.Router {
  router := httprouter.New()

  // HTML Routes
  router.GET("/", RenderCanvas)
  router.GET("/ships/:id", RenderCanvas)
  router.GET("/tactical", RenderCanvas)

  // JSON API routes
  router.GET("/api/v1/ships", GetAllStarships)
  router.GET("/api/v1/ships/:id", GetStarship)
  // router.POST("/api/v1/ships", createStarship)
  router.PUT("/api/v1/ships/:id", updateStarship)
  // router.DELETE("/api/v1/ships/:id", deleteStarship)

  return router
}
