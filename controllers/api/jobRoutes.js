const router = require("express").Router();
const { Job, User } = require("../../models");

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
