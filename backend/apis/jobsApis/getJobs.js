import Jobs from "../../models/Jobs.js";

export const getAllJobs = async(req, res) => {
    try{
        const getJobs = await Jobs.find({});
        res.send({ data :getJobs })
    } catch (error){
        console.log(error)
    }
}