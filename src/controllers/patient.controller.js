const db = require("../models");
const Patient = db.patient;

// Create and Save a new Patient
exports.create = async (req, res) => {
  try {
    const patient = await Patient.create({
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      address: req.body.address,
      medicalHistory: req.body.medicalHistory,
      // Using lowercase 'userId' to match the new association
      userId: req.userId 
    });
    res.status(201).send(patient);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Retrieve all Patients for the logged-in user.
exports.findAll = async (req, res) => {
  try {
    // Using lowercase 'userId' to match the new association
    const patients = await Patient.findAll({ where: { userId: req.userId } });
    res.status(200).send(patients);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Find a single Patient with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    // Using lowercase 'userId' to match the new association
    const patient = await Patient.findOne({ where: { id: id, userId: req.userId } });
    if (patient) {
      res.status(200).send(patient);
    } else {
      res.status(404).send({ message: `Patient not found with id=${id}.` });
    }
  } catch (error) {
    res.status(500).send({ message: "Error retrieving Patient with id=" + id });
  }
};

// Update a Patient by the id
exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        // Using lowercase 'userId' to match the new association
        const [num] = await Patient.update(req.body, { where: { id: id, userId: req.userId } });
        if (num == 1) {
            res.send({ message: "Patient was updated successfully." });
        } else {
            res.send({ message: `Cannot update Patient with id=${id}.` });
        }
    } catch (error) {
        res.status(500).send({ message: "Error updating Patient with id=" + id });
    }
};

// Delete a Patient with the specified id
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        // Using lowercase 'userId' to match the new association
        const num = await Patient.destroy({ where: { id: id, userId: req.userId } });
        if (num == 1) {
            res.send({ message: "Patient was deleted successfully!" });
        } else {
            res.send({ message: `Cannot delete Patient with id=${id}.` });
        }
    } catch (error) {
        res.status(500).send({ message: "Could not delete Patient with id=" + id });
    }
};

