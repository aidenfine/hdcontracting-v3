import Customer from "../../models/Customers.js";

export const addCustomer = async (req, res) => {
  try {
    const customerData = req.body;

    const existingCustomer = await Customer.findOne({ email: customerData.email });

    if (existingCustomer) {
      return res.status(400).json({ error: 'Customer already exists' });
    }

    const newCustomer = new Customer(customerData);
    const savedCustomer = await newCustomer.save();

    res.status(201).json(savedCustomer);
  } catch (error) {
    console.error("Can't add customer", error);
    res.status(500).json({ error: "Couldn't add customer" });
  }
};
