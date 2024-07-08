const Movie = require("../models/Movie");
const User = require("../models/User");


const getMoviesUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    // const movies = await Movie.find({ user: userId });
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    user = await User.findById(userId).populate("toWatchMovies");
    // console.log({user})


    return res.status(200).json({ ok: true, toWatchMovies: user.toWatchMovies});
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      ok: false,
      message: `Error al obtener las peliculas del usuario con el id: ${userId}`,
    });
  }
};

const addMovie = async (req, res) => {
  const { title, media_type, movieId, image } = req.body;
  const userId = req.uid;

  try {
    // Verificar si existe el usuario
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    user = await User.findById(userId).populate("toWatchMovies");

    const existingMovie = user.toWatchMovies.find(
      (movie) => movie.title.toLowerCase() === title.toLowerCase()
    );

    if (existingMovie) {
      return res.status(400).json({
        ok: false,
        message: "La película ya existe en la lista del usuario",
      });
    }
    // const movie = new Movie({
    //   title,
    //   image,
    //   movieId,
    //   media_type,
    //   user: userId,
    // });

    const movie = {
      title,
      media_type,
      image,
      movieId,
      user: userId,
    };
    // await movie.save();

    user.toWatchMovies.push(movie);
    await user.save();

    return res
      .status(201)
      .json({ ok: true, message: "Película añadida exitosamente", movie });
  } catch (error) {
    console.log({ error });
    return res
      .status(500)
      .json({ ok: false, message: "Error al añadir película" });
  }
};

const removeMovie = async (req, res) => {
  console.log("*********** Remove Movie ToWatchMovies *********************")
  const movieId = req.params.id;
  const userId = req.uid;

  try {
    // Verificar si existe el usuario
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    // let movie = await Movie.findById(movieId);

    // if (!movie) {
    //   return res
    //     .status(404)
    //     .json({ ok: false, message: "Película no encontrada" });
    // }

    // Encontrar el usuario y poblar las películas
    user = await User.findById(userId).populate("toWatchMovies");
    //Lista de peliculas del usuario
    const moviesUser = user.toWatchMovies;

    const isMovieUser = moviesUser.find(
      (movie) => movie._id.toString() === movieId
    );

    if (!isMovieUser) {
      return res.status(404).json({
        ok: false,
        message: "La película no se encuentra en la lista de este usuario",
      });
    }

    // Excluir la película a eliminar
    const newMovies = moviesUser.filter(
      (item) => item._id.toString() !== movieId
    );

    // actualizar el user
    await User.findByIdAndUpdate(userId, {
      toWatchMovies: newMovies,
    });

    await Movie.findByIdAndDelete(movieId);

    res
      .status(200)
      .json({ ok: true, message: "Película eliminada exitosamente" });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ ok: false, message: "Error al eliminar película" });
  }
};


module.exports = {
  addMovie,
  getMoviesUser,
  removeMovie,
};