const db = require('../models');
const Doctor = db.doctor;

// Create and Save a new Doctor
exports.create = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).send(doctor);
  } catch (err) {
    res.status(500).send({ message: err.message || "Error creating doctor." });
  }
};

// Retrieve all Doctors from the database.
exports.findAll = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.send(doctors);
  } catch (err) {
    res.status(500).send({ message: err.message || "Error retrieving doctors." });
  }
};

// Find a single Doctor with an id
exports.findOne = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (doctor) {
      res.send(doctor);
    } else {
      res.status(404).send({ message: `Doctor with id=${req.params.id} not found.` });
    }
  } catch (err) {
    res.status(500).send({ message: "Error retrieving doctor." });
  }
};

// Update a Doctor by the id in the request
exports.update = async (req, res) => {
  try {
    const [num] = await Doctor.update(req.body, { where: { id: req.params.id } });
    if (num == 1) {
      res.send({ message: "Doctor updated successfully." });
    } else {
      res.send({ message: `Cannot update Doctor with id=${req.params.id}.` });
    }
  } catch (err) {
    res.status(500).send({ message: "Error updating doctor." });
  }
};

// Delete a Doctor with the specified id
exports.delete = async (req, res) => {
  try {
    const num = await Doctor.destroy({ where: { id: req.params.id } });
    if (num == 1) {
      res.send({ message: "Doctor deleted successfully." });
    } else {
      res.send({ message: `Cannot delete Doctor with id=${req.params.id}.` });
    }
  } catch (err) {
    res.status(500).send({ message: "Error deleting doctor." });
  }
};
