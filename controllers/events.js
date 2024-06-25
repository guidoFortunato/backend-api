
const Event = require("../models/event");

const getEvents = async (req, res) => {
  const events = await Event.find().populate("user", "name");

  res.json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res) => {
  let event = new Event(req.body);

  try {
    event.user = req.uid;

    const eventSaved = await event.save();

    res.json({
      ok: true,
      event: eventSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Hable con el administrador",
    });
  }
};

const updateEvent = async (req, res) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        message: "El evento no existe con ese id",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        message: "No tiene el permiso de editar este evento",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

    res.json({
      ok: true,
      event: updatedEvent,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Hable con el administrador",
    });
  }
};

const deleteEvent = async(req, res) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        message: "El evento no existe con ese id",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        message: "No tiene el permiso de eliminar este evento",
      });
    }


    await Event.findByIdAndDelete( eventId );

    res.json({
      ok: true,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Hable con el administrador",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
