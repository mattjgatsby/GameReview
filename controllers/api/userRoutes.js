const router = require("express").Router();
const { User, Review, Games } = require("../../models");

// `/api/users` endpoint

// get all
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{ model: Review }, { model: Games }],
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get by id
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: Review }, { model: Games }],
    });
    if (!userData) {
      res.status(404).json("User not found!");
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res
        .status(200)
        .json(`Thanks for joining the discussion ${req.body.user_name}`);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    // match the id
    const userData = await User.update(
      {
        password: req.body.password,
      },
      { where: { id: req.params.id } }
    );
    if (!userData) {
      res.status(404).json("User not found!");
    }

    res.status(200).json("Updated password");
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  try {
    const userData = await User.destroy({ where: { id: req.params.id } });
    if (!userData) {
      res.status(404).json("User Not Found");
    }
    res.status(200).json("Succesfully Deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("inside login");
    const userData = await User.findOne({
      where: { user_name: req.body.user_name },
    });

    console.log("db: " + userData);

    if (!userData) {
      res.status(404).json("User Not Found");
    }

    console.log(userData.password);

    let validPassword = await userData.checkPassword(req.body.userPassword);

    console.log(validPassword);
    if (!validPassword) {
      res.status(400).json("Invalid password");
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
