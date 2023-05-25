import { Decimal128 } from 'mongodb';
import mongoose from 'mongoose';

const JobsSchema = new mongoose.Schema(
    {
        jobNumber:{
            type: Number,
            required:true,
            unique: true,
        },
        comp:{
            type: Boolean,
        },
        invoiceNumber:{
            type: Number,
            required:true,
            unique: true
        },
        management:{
            type: String,
        },
        hoa:{
            type: String
        },
        rec:{
            type: String
        },
        address:{
            city:{
                type: String,
                required: false,
            },
            street:{
                type: String
            }
        },
        description:{
            type: String,
        },
        lockbox:{
            type: String
        },
        estNumber: {
            type: String
        },
        estMoney:{
            type: Decimal128
        },
        phone:{
            type: String
        },
        owner: {
            type: String
        },
        scheduledDate:{
            type: String 
        },
        assignedTo:{
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                }
            ]
        }
    },
    { timestamps: true }
);

const Jobs = mongoose.model("Jobs", JobsSchema)

export default Jobs;