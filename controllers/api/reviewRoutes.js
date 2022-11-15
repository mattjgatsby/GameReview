const router = require("express").Router();
const { User, Review, Games } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "user_name"],
        },
        {
          model: Games,
          attributes: ["id", "games_name"],
        },
      ],
    });
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
  // retro fit this code to our db
  // try {
  //     const userData = await User.findAll({
  //         include: [{ model: Post }, { model: Comment }]
  //     })
  //     res.status(200).json(userData)
  // } catch (err) {
  //     res.status(500).json(err);
  // }
});

router.get("/:id", async (req, res) => {
  try {
    const reviewData = await Review.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["id", "user_name"],
        },
        {
          model: Games,
          attributes: ["id", "games_name"],
        },
      ],
    });
    if (!reviewData) {
      res.status(404).json({ message: "No review found with this id" });
      return;
    }
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {



    const postReview = await Review.create({
      review_body: req.body.review_body,
      review_date: req.body.review_date,
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(postReview);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedReview = await Review.update(
      {
        review_body: req.body.review_body,
      },
      {
        where: { id: req.params.id },
      }
    );

    res.json(updatedReview);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  const deletedReview = await Review.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json(deletedReview);
});
module.exports = router;
