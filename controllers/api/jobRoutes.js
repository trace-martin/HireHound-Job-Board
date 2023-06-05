const router = require("express").Router();
const { Job, User } = require("../../models");
const withAuth = require('../../utils/auth');
const { retrieveSavedJobDetails } = require('../../utils/helpers');

// GET All Jobs by User ID - Works
// /api/jobs/users - This will get the user that is currently logged in their jobs.
router.get("/user", async (req, res) => {
  try {
    const allJobs = await Job.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
        },
      ],
    });
    res.json(allJobs);
  } catch (error) {
    res.json(error);
  }
});

// Get all Jobs from the database - Works
// /api/jobs/
router.get("/", async (req, res) => {
  try {
    const allJobs = await Job.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    res.json(allJobs);
  } catch (error) {
    res.json(error);
  }
});
// GET Job by ID - Works
router.get("/:id", async (req, res) => {
  try {
    const allJobs = await Job.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
    });
    res.json(allJobs);
  } catch (error) {
    res.json(error);
  }
});

// POST Job - Posting the job into the database - Wrks
router.post("/", async (req, res) => {
  try {
    const saveJob = await Job.create(req.body);
    res.json(saveJob);
  } catch (error) {
    res.json(error);
  }
});

// saving jobs to render savedJobs.handle
router.post('/api/save/:id', withAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id);

    if(!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    await user.addJob(job);
    res.status(200).json({ message: 'Job saved successfully' });
  } catch (err) {
    console.error('Error saving job:', err);
    res.status(500).json({ error: 'Failed to save job' });
  }
});

router.get('/saved-jobs', withAuth, async (req, res) => {
  try {
    const jobDetails = await retrieveSavedJobDetails(req.session.user_id);
    res.render('savedJobs', { jobDetails});
} catch(error) {
  console.error('Error rendering saved jobs:', error);
  res.status(500).json({ error: 'Failed to render saved jobs' });
}
});

// DELETE Job

router.delete("/:id", (req, res) => {
  Job.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleteJob) => {
      res.json(deleteJob);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
