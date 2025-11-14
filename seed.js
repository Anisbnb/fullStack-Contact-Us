const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Admin = require('./models/admin');
const Lead = require('./models/lead');

const seedData = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to database for seeding');

    // Clear existing data (optional)
    await Admin.deleteMany({});
    await Lead.deleteMany({});
    console.log('Cleared existing data');

    // Create sample admin users
    const admins = [
      {
        id: 1,
        email: 'admin@example.com',
        password: 'hashedpassword123', // In real app, this should be bcrypt hashed
        role: 'admin'
      },
      {
        id: 2,
        email: 'superadmin@example.com',
        password: 'hashedpassword456', // In real app, this should be bcrypt hashed
        role: 'superadmin'
      }
    ];

    // Create sample leads
    const leads = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        company: 'Tech Corp',
        message: 'Interested in your rental services',
        status: 'new',
        remarks: 'High priority lead'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        company: 'Business Solutions',
        message: 'Looking for long-term rental options',
        status: 'contacted',
        remarks: 'Follow up next week'
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        company: 'StartupXYZ',
        message: 'Need equipment rental for event',
        status: 'received',
        remarks: 'Event scheduled for next month'
      }
    ];

    // Insert sample data
    await Admin.insertMany(admins);
    console.log('Sample admins created');

    await Lead.insertMany(leads);
    console.log('Sample leads created');

    console.log('Database seeded successfully!');
    console.log('You should now see the "contact" database in MongoDB Compass with:');
    console.log('- admins collection (2 documents)');
    console.log('- leads collection (3 documents)');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the seed function
seedData();