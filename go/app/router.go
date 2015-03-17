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
  // router.POST("/api/ships", createStarship)
  // router.DELETE("/api/ships/:id", deleteStarship)
  // router.PUT("/api/ships/:id", updateStarship)

  return router
}
