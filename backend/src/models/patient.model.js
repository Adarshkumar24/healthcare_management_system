module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define("Patient", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY
      },
      address: {
        type: DataTypes.STRING
      },
      medicalHistory: {
        type: DataTypes.TEXT
      }
      // The userId column is now removed from here.
      // The association in models/index.js will create it automatically.
    });
  
    return Patient;
  };

