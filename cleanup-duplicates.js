const { Sequelize, DataTypes } = require('sequelize');

// Database connection
const sequelize = new Sequelize('healthcare_db', 'adarshpradhan', '', {
    host: 'localhost',
    dialect: 'postgresql',
    logging: false
});

// Models
const Patient = sequelize.define('Patient', {
    name: { type: DataTypes.STRING, allowNull: false },
    dateOfBirth: { type: DataTypes.DATE, allowNull: false },
    medicalHistory: { type: DataTypes.TEXT }
});

const Doctor = sequelize.define('Doctor', {
    name: { type: DataTypes.STRING, allowNull: false },
    specialization: { type: DataTypes.STRING, allowNull: false }
});

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
});

const PatientDoctor = sequelize.define('PatientDoctor', {
    patientId: { type: DataTypes.INTEGER, references: { model: Patient, key: 'id' }},
    doctorId: { type: DataTypes.INTEGER, references: { model: Doctor, key: 'id' }}
});

// Associations
Patient.belongsToMany(Doctor, { through: PatientDoctor });
Doctor.belongsToMany(Patient, { through: PatientDoctor });

async function cleanupDuplicates() {
    try {
        await sequelize.authenticate();
        console.log('Connected to database successfully.');

        // Find and remove duplicate patients
        console.log('\n🔍 Checking for duplicate patients...');
        const patients = await Patient.findAll();
        const patientMap = new Map();
        const duplicatePatients = [];

        patients.forEach(patient => {
            const key = `${patient.name}-${patient.dateOfBirth}`;
            if (patientMap.has(key)) {
                duplicatePatients.push(patient);
            } else {
                patientMap.set(key, patient);
            }
        });

        if (duplicatePatients.length > 0) {
            console.log(`Found ${duplicatePatients.length} duplicate patients:`);
            duplicatePatients.forEach(p => console.log(`- ${p.name} (ID: ${p.id})`));
            
            // Remove duplicates
            for (const duplicate of duplicatePatients) {
                await PatientDoctor.destroy({ where: { patientId: duplicate.id } });
                await duplicate.destroy();
            }
            console.log('✅ Duplicate patients removed!');
        } else {
            console.log('✅ No duplicate patients found.');
        }

        // Find and remove duplicate doctors
        console.log('\n🔍 Checking for duplicate doctors...');
        const doctors = await Doctor.findAll();
        const doctorMap = new Map();
        const duplicateDoctors = [];

        doctors.forEach(doctor => {
            const key = `${doctor.name}-${doctor.specialization}`;
            if (doctorMap.has(key)) {
                duplicateDoctors.push(doctor);
            } else {
                doctorMap.set(key, doctor);
            }
        });

        if (duplicateDoctors.length > 0) {
            console.log(`Found ${duplicateDoctors.length} duplicate doctors:`);
            duplicateDoctors.forEach(d => console.log(`- ${d.name} (ID: ${d.id})`));
            
            // Remove duplicates
            for (const duplicate of duplicateDoctors) {
                await PatientDoctor.destroy({ where: { doctorId: duplicate.id } });
                await duplicate.destroy();
            }
            console.log('✅ Duplicate doctors removed!');
        } else {
            console.log('✅ No duplicate doctors found.');
        }

        // Show final counts
        const finalPatientCount = await Patient.count();
        const finalDoctorCount = await Doctor.count();
        console.log(`\n📊 Final counts:`);
        console.log(`- Patients: ${finalPatientCount}`);
        console.log(`- Doctors: ${finalDoctorCount}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

cleanupDuplicates();
