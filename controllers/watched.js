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

    user = await User.findById(userId).populate("watchedMovies");
    // console.log({user})

    return res
      .status(200)
      .json({ ok: true, watchedMovies: user.watchedMovies });
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

    user = await User.findById(userId).populate("watchedMovies");
    
    const existingMovie = user.watchedMovies.find(
      (movie) => movie.movieId.toString() === movieId.toString()
    );

    if (existingMovie) {
      return res.status(400).json({
        ok: false,
        message: "La película ya existe en la lista del usuario",
      });
    }

    const movie = {
      title,
      media_type,
      image,
      movieId,
      user: userId,
    };
    // await movie.save();

    user.watchedMovies.push(movie);
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
  console.log("*********** Remove Movie Watched *********************");
  const movieId = req.params.id;
  const userId = req.uid;
  // console.log({movieId})

  try {
    // Verificar si existe el usuario
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    // Encontrar el usuario y poblar las películas
    user = await User.findById(userId).populate("watchedMovies");
    //Lista de peliculas del usuario
    const moviesUser = user.watchedMovies;
    // console.log({moviesUser})

    const isMovieUser = moviesUser.find(
      (movie) => movie.movieId.toString() === movieId.toString()
    );
    // console.log({isMovieUser})

    if (!isMovieUser) {
      return res.status(404).json({
        ok: false,
        message: "La película no se encuentra en la lista de este usuario",
      });
    }

    // Excluir la película a eliminar
    const newMovies = moviesUser.filter(
      (item) => item.movieId.toString() !== movieId.toString()
    );

    // actualizar el user
    await User.findByIdAndUpdate(userId, {
      watchedMovies: newMovies,
    });

    // await Movie.findByIdAndDelete(movieId);

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
