const router = require("express").Router();
const { Job, User } = require("../../models");

// GET All Jobs by User ID
router.get("/", async (req, res) => {
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

// GET Job by ID
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

// POST Job - Posting the job into the database
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
