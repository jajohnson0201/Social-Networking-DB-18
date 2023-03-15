const { User } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find().then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getOneUser(req, res) {
        User.findOne({_id: req.params.userID})
        .populate({path: 'Thought', select: '-__v' })
        .then((user)=> !user  
        ?  res.status(404).json({message: 'No User matches that ID'})
        : res.json(user))
        .catch((err)=> res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
        .then((newUser) => res.json(newUser))
        .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => 
        !user
        ? res.status(404).json({message: 'No User with this ID'})
        : res.json(user))
        .catch((err)=> res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete(
            { _id: req.params.userID })
            .then((user)=> 
            !user
            ? res.status(404).json({message: 'No User with this ID'})
            : res.json(user))
            .catch((err)=> res.status(500).json(err));
    },  
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userID },
            { $addToSet: { thoughts: req.params.friendID } },
            { runValidators: true, new: true })
            .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    },
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userID },
            { $pull: { assignment: { thoughts: req.params.friendID } } },
            { runValidators: true, new: true }
        )
        .then((user)=> 
        !user
        ? res .status(404)
        .json({message: 'no user found with that ID.'})
        : res.json(user))
        .catch((err)=> res.status(500).json(err))
    }
};