import Customer from "../../models/Customers.js";

export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(customer);
  } catch (error) {
    console.error("Can't fetch customer", error);
    res.status(500).json({ error: "Couldn't fetch customer" });
  }
};
