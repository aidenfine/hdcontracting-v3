import mongoose from 'mongoose';

const SubCustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    city: String,
    street: String,
  },
  email: String,
  notes: String,
});

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  email: {
    type: String,
    max: 50,
    unique: true,
  },
  address: {
    city: String,
    street: String,
  },
  notes: {
    type: String,
    max: 500,
  },
  subCustomers: {
    type: [SubCustomerSchema],
  },
});

const Customer = mongoose.model('Customer', CustomerSchema);

export default Customer;
