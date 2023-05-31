const router = require("express").Router();
const { Job, User } = require("../../models");

// GET All Jobs by User ID
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
    res.json(err);
  }
});

// GET Job by ID
router.get("/:id", async (req, res) => {
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

// POST Job
router.get("/:id", async (req, res) => {
  try {
    const postJobs = await Job.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    res.json(postJobs);
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
