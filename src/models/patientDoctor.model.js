// This is the junction/pivot table for the Many-to-Many relationship
// between Patients and Doctors.
module.exports = (sequelize, DataTypes) => {
  const PatientDoctor = sequelize.define("PatientDoctor", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
    // patientId and doctorId foreign keys will be added by Sequelize automatically
  });

  return PatientDoctor;
};
