const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        ok: false,
        message: "Ya existe un usuario con ese correo electrónico",
      });
    }

    user = new User(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // Generar JWT
    const token = await generateJWT( user.id, user.name )

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token: token
    });

  } catch (error) {

    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Por favor hable con el administrador",
    });

  }
};



const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if ( !user ) {
      return res.status(400).json({
        ok: false,
        message: "Usuario y/o contraseña no son correctos",
      });
    }

    //confirmar los passwords
    const validPassword = bcrypt.compareSync( password, user.password );
    
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        // message: "Usuario y/o contraseña no son correctos"
        message: "Usuario y/o contraseña no son correctos"
      })
    }

    // Generar JWT
    const token = await generateJWT( user.id, user.name )
    


    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token: token
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Por favor hable con el administrador",
    });
  }
};

const revalidateToken = async(req, res = response) => {

  const uid = req.uid
  const name = req.name

// Generar JWT
  const token = await generateJWT( uid, name )


  res.json({
    ok: true,
    uid,
    name,
    token
  });
};

module.exports = {
  createUser,
  loginUser,
  revalidateToken,
};
