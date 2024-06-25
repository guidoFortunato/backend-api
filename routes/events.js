/*
  Event Routes
  /api/events
*/
const express = require("express");
const { check } = require("express-validator");
const { jwtValidate } = require("../middlewares/jwt-validate");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { validateFields } = require("../middlewares/fields-validator");
const router = express.Router();

// Todas tienen que pasar por la validacion del JWT
router.use(jwtValidate);

// obtener eventos
router.get("/", getEvents);

// crear evento
router.post(
  "/",
  [check("title", "El título es obligatorio").not().isEmpty(), validateFields],
  createEvent
);

// actualizar evento
router.put(
  "/:id",
  [check("title", "El título es obligatorio").not().isEmpty(), validateFields],
  updateEvent
);

// borrar evento
router.delete("/:id", deleteEvent);

module.exports = router;
