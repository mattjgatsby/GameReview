const router = require('express').Router();


router.get('/', async (req, res) => {

    // retro fit this code to our db
    // try {
    //     const userData = await User.findAll({
    //         include: [{ model: Post }, { model: Comment }]
    //     })
    //     res.status(200).json(userData)
    // } catch (err) {
    //     res.status(500).json(err);
    // }

})


module.exports = router;