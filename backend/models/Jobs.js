import mongoose from 'mongoose';

const JobsSchema = new mongoose.Schema(
    {
        Jobs:{
            type: String,
            required:true,
            min: 2,
            max: 100,
        },
        assignedTo:{
            type: String,
            required:true,
            max: 50,
            unique: true
        },
        address:{
            type: String,
            required:true,
            min: 5
        },
    },
    { timestamps: true }
);

const Jobs = mongoose.model("Jobs", JobsSchema)

export default Jobs;