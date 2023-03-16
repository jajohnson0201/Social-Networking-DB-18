const router = require('express').Router();

const {getThoughts,getOneThought,createThought,updateThought,deleteThought,addReaction,deleteReaction} = require('../../controllers/thoughtController');

router.route('/')
            .get(getThoughts)
            .post(createThought);
router.route('/:userID')
            .get(getOneThought)
            .delete(deleteThought)
            .put(updateThought);
router.route('/:userID/friends/:friendID')
            .post(addReaction)
            .delete(deleteReaction);


module.exports = router;