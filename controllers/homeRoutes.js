const router = require("express").Router();
const { User, Job } = require("../models");
const withAuth = require("../utils/auth");

// Prevent non logged in users from viewing the homepage
//router.get('/', withAuth, async (req, res) => {
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["name", "ASC"]],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render("homepage", {
      users,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login-signup");
});

//Goes to the saved job page. Gets all of the jobs attached to the user.
router.get("/savedJobs", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Job,
        },
      ],
    });
    const user = userData.get({ plain: true });
    console.log(user);
    res.render("savedJobs", {
      jobDetails: user.jobs,
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
