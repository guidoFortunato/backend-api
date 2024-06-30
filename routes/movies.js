const express = require('express');
const { check } = require("express-validator");
const { jwtValidate } = require("../middlewares/jwt-validate");
const { addMovie, getMoviesUser, removeMovie } = require('../controllers/movie');
const { validateFields } = require('../middlewares/fields-validator');


const router = express.Router();

// Todas tienen que pasar por la validacion del JWT
router.use(jwtValidate);

// obtener todas las peliculas
router.get(
  "/:userId",
  [
    check("userId", "El id es obligatorio").not().isEmpty(),
    validateFields
  ],
  getMoviesUser
);

//añadir pelicula
router.put(
  "/",
  [
    check("title", "title es obligatorio").not().isEmpty(),
    validateFields
  ],
  addMovie
);


//actualizar  pelicula
router.delete(
  "/:id",
  [
    check("id", "El id es obligatorio").not().isEmpty(),
    validateFields
  ],
  removeMovie
);

module.exports = router;