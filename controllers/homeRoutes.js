const router = require('express').Router();


router.get('/', async (req, res) => {

    res.render('homepage', {
        // pass the data to handlebars
    })

})


module.exports = router;