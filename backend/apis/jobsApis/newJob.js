import Jobs from "../../models/Jobs.js";

export const addNewJob = async (req, res) => {
    try {
      // Extract the job data from the request body
      const { jobNumber, comp, invoiceNumber, management, hoa, rec, address, description, lockbox, estNumber, estMoney, phone, scheduledDate, assignedTo } = req.body;

      const existingJob = await Jobs.findOne({ jobNumber });

      if(existingJob){
        return res.status(400).json({ error: 'Job already exists '});
      }
  
      // Create a new instance of the Jobs model with the extracted data
      const newJob = new Jobs({
        jobNumber,
        comp,
        invoiceNumber,
        management,
        hoa,
        rec,
        address,
        description,
        lockbox,
        estNumber,
        estMoney,
        phone,
        scheduledDate,
        assignedTo,
      });
  
      // Save the new job to the database
      const savedJob = await newJob.save();
  
      // Send a success response
      res.status(200).json(savedJob);
    } catch (error) {
      // Handle any errors that occurred during the process
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  