const db = require("../models");
const PatientDoctor = db.patientDoctor;
const Patient = db.patient; 

// Assign a doctor to a patient
exports.create = async (req, res) => {
  try {
    const { patientId, doctorId } = req.body;

    // Validate required fields
    if (!patientId || !doctorId) {
      return res.status(400).send({
        message: "Patient ID and Doctor ID are required."
      });
    }

    // First, validate that the patient belongs to the logged-in user
    const patient = await Patient.findOne({
      where: {
        id: patientId,
        userId: req.userId 
      }
    });

    if (!patient) {
      return res.status(403).send({
        message: "Forbidden: You can only assign doctors to your own patients."
      });
    }

    // Check if mapping already exists to prevent duplicates
    const existingMapping = await PatientDoctor.findOne({
      where: {
        patientId: patientId,
        doctorId: doctorId
      }
    });

    if (existingMapping) {
      return res.status(409).send({
        message: "This doctor is already assigned to this patient."
      });
    }

    // If validation passes, create the mapping
    const mapping = await PatientDoctor.create({
      patientId: patientId,
      doctorId: doctorId
    });

    res.status(201).send({
      message: "Doctor assigned successfully!",
      mapping: mapping
    });
  } catch (error) {
    console.error('Mapping creation error:', error);
    res.status(500).send({ 
      message: error.message || "Some error occurred while creating the mapping." 
    });
  }
};

// Find all mappings
exports.findAll = async (req, res) => {
  try {
    const mappings = await PatientDoctor.findAll();
    res.status(200).send(mappings);
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while retrieving mappings." });
  }
};

// Find all doctors for a specific patient
exports.findAllForPatient = async (req, res) => {
  const patientId = req.params.patientId;
  try {
    // Also validate patient ownership here for security
    const patient = await Patient.findOne({
     where: {
       id: patientId,
       userId: req.userId
     }
   });

    if (!patient) {
     return res.status(403).send({
       message: "Forbidden: You can only view mappings for your own patients."
     });
   }

    // Get mappings with doctor details using raw query since associations might not work
    const mappings = await db.sequelize.query(`
      SELECT pd.id, pd."patientId", pd."doctorId", pd."createdAt", pd."updatedAt",
             d.id as "doctor_id", d.name as "doctor_name", d.specialization as "doctor_specialization"
      FROM "PatientDoctors" pd
      JOIN "Doctors" d ON pd."doctorId" = d.id
      WHERE pd."patientId" = :patientId
    `, {
      replacements: { patientId: patientId },
      type: db.sequelize.QueryTypes.SELECT
    });

    // Transform the data to match expected structure
    const formattedMappings = mappings.map(mapping => ({
      id: mapping.id,
      patientId: mapping.patientId,
      doctorId: mapping.doctorId,
      createdAt: mapping.createdAt,
      updatedAt: mapping.updatedAt,
      doctor: {
        id: mapping.doctor_id,
        name: mapping.doctor_name,
        specialization: mapping.doctor_specialization
      }
    }));

    res.status(200).send(formattedMappings);
  } catch (error) {
    console.error('Find patient mappings error:', error);
    res.status(500).send({ message: "Error retrieving mappings for patient with id=" + patientId });
  }
};


// Delete a mapping
exports.delete = async (req, res) => {
    const { patientId, doctorId } = req.body;
    try {
        // It's good practice to validate ownership before deleting
        const num = await PatientDoctor.destroy({
            where: { patientId: patientId, doctorId: doctorId }
        });

        if (num == 1) {
            res.send({
                message: "Mapping was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete mapping. Maybe it was not found!`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Could not delete mapping."
        });
    }
};

