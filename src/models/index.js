const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.user = require("./user.model.js")(sequelize, Sequelize);
db.patient = require("./patient.model.js")(sequelize, Sequelize);
db.doctor = require("./doctor.model.js")(sequelize, Sequelize);
db.patientDoctor = require("./patientDoctor.model.js")(sequelize, Sequelize);

// === THIS IS THE UPDATED PART ===
// Define associations with an explicit foreign key
db.user.hasMany(db.patient, { foreignKey: 'userId' });
db.patient.belongsTo(db.user, { foreignKey: 'userId' });

db.patient.belongsToMany(db.doctor, { through: db.patientDoctor, foreignKey: 'patientId' });
db.doctor.belongsToMany(db.patient, { through: db.patientDoctor, foreignKey: 'doctorId' });

// Add associations for PatientDoctor junction table
db.patientDoctor.belongsTo(db.patient, { foreignKey: 'patientId' });
db.patientDoctor.belongsTo(db.doctor, { foreignKey: 'doctorId' });
// =================================

module.exports = db;

