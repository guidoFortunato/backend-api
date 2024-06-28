const express = require('express');
const { check } = require("express-validator");
const { jwtValidate } = require("../middlewares/jwt-validate");
const { validateFields } = require('../middlewares/fields-validator');
const { addMovieToWatch, removeMovieToWatch, getMoviesToWatchUser } = require('../controllers/toWatchMovies');


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
  getMoviesToWatchUser
);

//añadir pelicula
router.put(
  "/",
  [
    check("title", "title es obligatorio").not().isEmpty(),
    validateFields
  ],
  addMovieToWatch
);


//actualizar  pelicula
router.delete(
  "/:id",
  [
    check("id", "El id es obligatorio").not().isEmpty(),
    validateFields
  ],
  removeMovieToWatch
);

module.exports = router;