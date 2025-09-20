const { Sequelize } = require('sequelize');
const path = require('path');

// Database configuration - using same config as the backend
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: 'healthcare_db',
    username: 'adarshpradhan',
    password: process.env.DB_PASSWORD || '',
    logging: false
});

// Sample doctors data
const sampleDoctors = [
    {
        name: 'Sarah Johnson',
        specialization: 'Cardiology'
    },
    {
        name: 'Michael Chen',
        specialization: 'Pediatrics'
    },
    {
        name: 'Emily Rodriguez',
        specialization: 'Dermatology'
    },
    {
        name: 'David Thompson',
        specialization: 'Orthopedics'
    },
    {
        name: 'Lisa Kim',
        specialization: 'Neurology'
    },
    {
        name: 'Robert Davis',
        specialization: 'General Medicine'
    },
    {
        name: 'Jennifer Wilson',
        specialization: 'Psychiatry'
    },
    {
        name: 'Thomas Brown',
        specialization: 'Oncology'
    }
];

// Sample patients data - Indian names
const samplePatients = [
    {
        name: 'Priya Sharma',
        dateOfBirth: '1985-03-15',
        medicalHistory: 'History of hypertension, well controlled with medication. Regular check-ups needed for blood pressure monitoring.'
    },
    {
        name: 'Rajesh Kumar',
        dateOfBirth: '1992-07-22',
        medicalHistory: 'Type 1 diabetes diagnosed at age 12. Uses insulin pump, excellent glucose control. Active lifestyle maintained.'
    },
    {
        name: 'Anita Patel',
        dateOfBirth: '1978-11-08',
        medicalHistory: 'Previous knee surgery in 2019. Physical therapy completed successfully. Occasional joint pain during weather changes.'
    },
    {
        name: 'Vikram Singh',
        dateOfBirth: '1965-01-30',
        medicalHistory: 'Mild asthma, seasonal allergies. Uses rescue inhaler as needed. No recent exacerbations.'
    },
    {
        name: 'Meera Reddy',
        dateOfBirth: '1990-09-12',
        medicalHistory: 'Anxiety and depression, currently on stable medication regimen. Regular therapy sessions. Good progress.'
    }
];

// Combined seed function
const seedDatabase = async () => {
    try {
        console.log('🔄 Connecting to database...');
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');
        
        // Seed Doctors
        console.log('\n🔄 Adding sample doctors to database...');
        for (const doctor of sampleDoctors) {
            await sequelize.query(
                `INSERT INTO "Doctors" (name, specialization, "createdAt", "updatedAt") 
                 VALUES (?, ?, NOW(), NOW())`,
                {
                    replacements: [doctor.name, doctor.specialization],
                    type: Sequelize.QueryTypes.INSERT
                }
            );
            console.log(`✅ Added doctor: Dr. ${doctor.name} (${doctor.specialization})`);
        }
        
        // Seed Patients
        console.log('\n🔄 Adding sample patients to database...');
        for (const patient of samplePatients) {
            await sequelize.query(
                `INSERT INTO "Patients" (name, "dateOfBirth", "medicalHistory", "createdAt", "updatedAt") 
                 VALUES (?, ?, ?, NOW(), NOW())`,
                {
                    replacements: [patient.name, patient.dateOfBirth, patient.medicalHistory],
                    type: Sequelize.QueryTypes.INSERT
                }
            );
            console.log(`✅ Added patient: ${patient.name}`);
        }
        
        console.log('\n🎉 Database seeding completed successfully!');
        console.log('\n👨‍⚕️ Added Doctors:');
        sampleDoctors.forEach((doctor, index) => {
            console.log(`${index + 1}. Dr. ${doctor.name} - ${doctor.specialization}`);
        });
        
        console.log('\n🏥 Added Patients:');
        samplePatients.forEach((patient, index) => {
            console.log(`${index + 1}. ${patient.name} (DOB: ${patient.dateOfBirth})`);
        });
        
        console.log('\n✨ Your healthcare system is now ready with sample data!');
        console.log('💡 Refresh your browser to see the populated doctors and patients.');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

// Clear and seed function (removes existing data first)
const clearAndSeed = async () => {
    try {
        console.log('🔄 Connecting to database...');
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');
        
        console.log('\n⚠️  Clearing existing data...');
        await sequelize.query('DELETE FROM "PatientDoctors"', { type: Sequelize.QueryTypes.DELETE });
        await sequelize.query('DELETE FROM "Patients"', { type: Sequelize.QueryTypes.DELETE });
        await sequelize.query('DELETE FROM "Doctors"', { type: Sequelize.QueryTypes.DELETE });
        console.log('✅ Existing data cleared.');
        
        await seedDatabase();
    } catch (error) {
        console.error('❌ Error clearing and seeding database:', error);
        process.exit(1);
    }
};

// Check command line arguments
const args = process.argv.slice(2);
if (args.includes('--clear')) {
    clearAndSeed();
} else {
    seedDatabase();
}

module.exports = { seedDatabase, clearAndSeed };
