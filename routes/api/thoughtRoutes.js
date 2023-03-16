const router = require('express').Router();

const {getThoughts,getOneThought,createThought,updateThought,deleteThought,addReaction,deleteReaction} = require('../../controllers/thoughtController');

router.route('/')
            .get(getThoughts)
            .post(createThought);
router.route('/:thoughtID')
            .get(getOneThought)
            .delete(deleteThought)
            .put(updateThought);
router.route('/:thoughtID/reactions/:friendID')
            .post(addReaction)
            .delete(deleteReaction);


module.exports = router;