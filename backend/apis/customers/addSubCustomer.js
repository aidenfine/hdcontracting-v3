import Customer from "../../models/Customers.js";

export const addSubCustomer = async (req, res) => {
  try {
    const { parentId, subCustomerId } = req.params; // Get the parent customer ID and sub-customer ID from the request URL parameters
    const subCustomerData = req.body;

    const parentCustomer = await Customer.findById(parentId);
    if (!parentCustomer) {
      return res.status(404).json({ error: "Parent customer not found" });
    }

    const subCustomerIndex = parentCustomer.subCustomers.findIndex(
      (subCustomer) => subCustomer._id.toString() === subCustomerId
    );
    if (subCustomerIndex === -1) {
      return res.status(404).json({ error: "Sub-customer not found" });
    }

    parentCustomer.subCustomers[subCustomerIndex] = {
      ...parentCustomer.subCustomers[subCustomerIndex],
      ...subCustomerData
    };

    const savedParentCustomer = await parentCustomer.save();

    res.status(200).json(savedParentCustomer);
  } catch (error) {
    console.error("Can't update sub-customer", error);
    res.status(500).json({ error: "Couldn't update sub-customer" });
  }
};
