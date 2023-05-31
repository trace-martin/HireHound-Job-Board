const router = require("express").Router();
const { User } = require("../../models");

// POST User
router.post("/", async (req, res) => {
  try {
    const newUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {  // Update session object
      req.session.user_id = newUserData.id;
      req.session.logged_in = true;

      res.status(200).json(newUserData);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// POST Login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const isPwdValid = await userData.checkPassword(req.body.password); // Validate password entered matches password saved in DB

    if (!isPwdValid) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {  // Update session object
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You have logged in successfully" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// POST Logout
router.post("/logout", async (req, res) => {
  if (req.session.logged_in) {  // If user is logged in, then destroy session object
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;