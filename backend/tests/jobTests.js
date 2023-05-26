import mongoose from 'mongoose';

// Import your schema
import Jobs from '../models/Jobs';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});


const newJob = new Jobs({
    jobNumber: 12345,
    comp: true,
    invoiceNumber: 67890,
    management: 'Some management',
    hoa: 'Some HOA',
    rec: 'Some rec',
    address: {
      city: 'Some city',
      street: 'Some street',
    },
    description: 'Some description',
    lockbox: 'Some lockbox',
    estNumber: 'Some estNumber',
    estMoney: 'Some estMoney',
    phone: 'Some phone',
    scheduledDate: 'Some scheduledDate',
    assignedTo: ['user1', 'user2'],
  });
  

  
