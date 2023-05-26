import Customer from '../../models/Customers.js'

export const getAllCustomers = async(req, res) => {
    try{
        const allCustomers = await Customer.find({});
        res.send({ data :allCustomers })
    } catch (error){
        console.log(error)
    }
}