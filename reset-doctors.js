const db = require('./src/models');
const Doctor = db.doctor;

async function resetAndSeedDoctors() {
  try {
    // Clear existing doctors
    await Doctor.destroy({ where: {} });
    console.log('✅ Cleared existing doctors');

    // Sample doctors to seed
    const doctors = [
      { name: 'Dr. Sarah Johnson', specialization: 'Cardiology' },
      { name: 'Dr. Michael Chen', specialization: 'Pediatrics' },
      { name: 'Dr. Emily Rodriguez', specialization: 'Dermatology' },
      { name: 'Dr. David Thompson', specialization: 'Orthopedics' },
      { name: 'Dr. Lisa Park', specialization: 'Neurology' },
      { name: 'Dr. James Wilson', specialization: 'General Medicine' },
      { name: 'Dr. Maria Santos', specialization: 'Psychiatry' },
      { name: 'Dr. Robert Lee', specialization: 'Oncology' }
    ];

    // Create doctors
    await Doctor.bulkCreate(doctors);
    console.log('✅ Added new doctors successfully!');
    
    // Display the added doctors
    console.log('\n📋 New doctors added:');
    const newDoctors = await Doctor.findAll();
    newDoctors.forEach((doctor, index) => {
      console.log(`${index + 1}. ${doctor.name} - ${doctor.specialization}`);
    });
    
  } catch (error) {
    console.error('❌ Error resetting doctors:', error.message);
  } finally {
    // Close the database connection
    await db.sequelize.close();
  }
}

// Run the seeder
resetAndSeedDoctors();
