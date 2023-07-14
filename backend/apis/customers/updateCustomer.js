import Customer from "../../models/Customers.js";

export const updateCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const updatedCustomerData = req.body;

    const existingCustomer = await Customer.findById(customerId);

    if (!existingCustomer) {
      console.error('Customer not found');
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Update only the provided fields in the existing customer data
    Object.assign(existingCustomer, updatedCustomerData);

    const updatedCustomer = await existingCustomer.save();

    console.log('Customer updated successfully:', updatedCustomer);

    res.json(updatedCustomer);
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ error: "Error updating customer" });
  }
};
