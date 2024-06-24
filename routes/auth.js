/*

Rutas de Usuarios / Auth
host + /api/auth

*/
const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  revalidateToken,
} = require("../controllers/auth");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/fields-validator");

router.post(
  "/register",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validateFields
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validateFields
  ],
  loginUser
);

router.get("/renew", revalidateToken);

module.exports = router;
