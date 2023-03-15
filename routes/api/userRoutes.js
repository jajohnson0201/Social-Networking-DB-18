const router = require('express').Router();

const {getUsers,getOneUser,createUser,updateUser,deleteUser,addFriend,deleteFriend} = require('../../controllers/userController');

router.route('/')
            .get(getUsers)
            .post(createUser);
router.route('/:userID')
            .get(getOneUser)
            .delete(deleteUser)
            .put(updateUser);
router.route('/:userID/friends/:friendID')
            .post(addFriend)
            .delete(deleteFriend);


module.exports = router;