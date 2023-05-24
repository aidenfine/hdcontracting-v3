import Jobs from '../../models/Jobs.js'

export const updateJob = async(req, res) => {
    try {
        const job = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        if (!job) {
          res.status(404).json({ error: 'Job not found' });
        } else {
          res.json(job);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
}