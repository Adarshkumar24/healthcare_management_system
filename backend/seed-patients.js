const { Sequelize } = require('sequelize');
const path = require('path');

// Database configuration - using same config as the backend
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: 'healthcare_db', // Using the correct database name
    username: 'adarshpradhan', // Using the correct username
    password: process.env.DB_PASSWORD || '',
    logging: false
});

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

// Seed function
const seedPatients = async () => {
    try {
        console.log('🔄 Connecting to database...');
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');
        
        console.log('🔄 Adding sample patients to database...');
        
        // Insert patients using raw SQL to avoid model dependencies
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
        
        console.log('\n🎉 Sample patients have been added to the database successfully!');
        console.log('\n📋 Added Patients:');
        samplePatients.forEach((patient, index) => {
            console.log(`${index + 1}. ${patient.name} (DOB: ${patient.dateOfBirth})`);
        });
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding patients:', error);
        process.exit(1);
    }
};

// Run the seeding function
if (require.main === module) {
    seedPatients();
}

module.exports = { seedPatients };
