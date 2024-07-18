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

    user = await User.findById(userId).populate("favoriteMovies");
    // console.log({user})

    return res
      .status(200)
      .json({ ok: true, favoriteMovies: user.favoriteMovies });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      ok: false,
      message: `Error al obtener las peliculas del usuario con el id: ${userId}`,
    });
  }
};

const addMovie = async (req, res) => {
  const { title, media_type, image, movieId } = req.body;
  const userId = req.uid;
  // console.log(req.body)

  try {
    // Verificar si existe el usuario
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    user = await User.findById(userId).populate("favoriteMovies");

    const existingMovie = user.favoriteMovies.find(
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

    user.favoriteMovies.push(movie);
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
  // console.log("*********** Remove Movie Favorites *********************");
  let movieId = req.params.id;
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
    user = await User.findById(userId).populate("favoriteMovies");

    //Lista de peliculas del usuario
    const moviesUser = user.favoriteMovies;

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
      favoriteMovies: newMovies,
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
