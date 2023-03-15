const { Thought, User, reactionSchema } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find().then((Thoughts) => res.json(Thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getOneThought(req, res) {
        Thought.findOne({_id: req.params.thoughtID})
        .then((thought)=> !thought  
        ?  res.status(404).json({message: 'No Thought matches that ID'})
        : res.json(thought))
        .catch((err)=> res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
        .then((newThought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: newThought._id } },
                { new: true }
              );
        })
        .then((user)=>
        !user? res.status(404).json({message: 'Thought created, but no user found with the id...'})
        : res.json('Created the Thought with an assosiated user!')
        ).catch((err)=> {
            res.status(500).json(err);
        });
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then((thought)=> {
            return User.findOneAndUpdate(
                {_id: req.body.userID},
                { $set: { thoughts: thought._id } },
                { new: true }
            );
        })
        .then((Thought) => 
        !Thought
        ? res.status(404).json({message: 'No Thought with this ID'})
        : res.json(Thought))
        .catch((err)=> res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete(
            { _id: req.params.thoughtID })
            .then((thought)=> {
                return User.findOneAndDelete(
                    {_id: req.body.userID},
                    { $set: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((Thought)=> 
            !Thought
            ? res.status(404).json({message: 'No Thought with this ID'})
            : res.json(Thought))
            .catch((err)=> res.status(500).json(err));
    },  
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtID },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true })
            .then((Thought) =>
        !Thought
          ? res
              .status(404)
              .json({ message: 'No Thought found with that ID' })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.ThoughtID },
            { $pull: { assignment: { thoughts: req.params.friendID } } },
            { runValidators: true, new: true }
        )
        .then((Thought)=> 
        !Thought
        ? res .status(404)
        .json({message: 'no Thought found with that ID.'})
        : res.json(Thought))
        .catch((err)=> res.status(500).json(err))
    }
};