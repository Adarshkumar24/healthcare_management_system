const db = require('./src/models');
const Doctor = db.doctor;

async function seedDoctors() {
  try {
    // Check if doctors already exist
    const existingDoctors = await Doctor.findAll();
    if (existingDoctors.length > 0) {
      console.log('Doctors already exist in the database. Skipping seeding.');
      return;
    }

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
    console.log('✅ Sample doctors have been added to the database successfully!');
    
    // Display the added doctors
    console.log('Added doctors:');
    doctors.forEach((doctor, index) => {
      console.log(`${index + 1}. ${doctor.name} - ${doctor.specialization}`);
    });
    
  } catch (error) {
    console.error('❌ Error seeding doctors:', error.message);
  } finally {
    // Close the database connection
    await db.sequelize.close();
  }
}

// Run the seeder
seedDoctors();
