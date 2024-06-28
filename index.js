const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

app.use(cors());

// Directorio público
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth"));
// app.use("/api/movies", require("./routes/movies"));
app.use("/api/user/favorites/", require("./routes/movies"));
app.use("/api/user/to-watch/", require("./routes/toWatchMovies"));
app.use("/api/user/watched/", require("./routes/watched"));

//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
