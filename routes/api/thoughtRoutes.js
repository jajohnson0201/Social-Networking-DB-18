const router = require('express').Router();

const {} = require('../../controllers/thoughtController');

router.route('/')
            .get()
            .post();
router.route('/:userID')
            .get()
            .delete()
            .put();
router.route('/:userID/friends/:friendID')
            .post()
            .delete();


module.exports = router;