import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required:true,
            min: 2,
            max: 100,
        },
        email:{
            type: String,
            max: 50,
            unique: true
        },
        address:{
            city:{
                type: String,
                required: false,
            },
            street:{
                type: String,
            },
        },
        notes:{
            type: String,
            max: 500,
        },
        subCustomers:{
            type: [
                {
                    name:{
                        type: String,
                        required: true,
                    },
                    address:{
                        city:{
                            type: String,
                            required: false,
                        },
                        street:{
                            type: String,
                        },
                    },
                    email:{
                        type: String,
                    },
                    notes:{
                        type: String
                    },

                }
            ]
        }
    },
    { timestamps: true }
);

const Customer = mongoose.model("Customer", CustomerSchema)

export default Customer;