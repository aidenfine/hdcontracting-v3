// import Jobs from "../../models/Jobs";
// export const deleteJob = async(req, res) => {
//     try {
//         const job = await Jobs.findByIdAndDelete(req.params.id);
//         if (!job) {
//           res.status(404).json({ error: 'Job not found' });
//         } else {
//           res.sendStatus(204);
//         }
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//       }