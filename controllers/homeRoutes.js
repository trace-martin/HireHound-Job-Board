require("dotenv").config();
const router = require("express").Router();
const { User, Job } = require("../models");

router.get("/", async (req, res) => {
  try {
    let searchText = req.query.q;
    let jobsData;
    if (searchText) {
      const apiUrl = `https://findwork.dev/api/jobs/?search=${searchText}&sort_by=relevance`;

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Token ${process.env.API_KEY}`,
          "Access-Control-Allow-Origin": "*",
        },
      });

      jobsData = await response.json();
    }

    res.render("homepage", { 
      jobsData: jobsData ? jobsData.results : jobsData,
      searchText,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id, 
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

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      alert("There was an error logging you out!");
      console.error("Error destroying session:", err);
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.redirect("/");
  });
});

//Goes to the user profile page. Gets all of the jobs attached to the user.
router.get("/userProfile", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Job,
        },
      ],
    });
    const user = userData.get({ plain: true });

    res.render("userProfile", {
      jobDetails: user.Jobs,
      name: user.name,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
