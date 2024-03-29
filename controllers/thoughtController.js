const { User, reactionSchema } = require('../models');
const {Thought} = require('../models/Thought');
module.exports = {
    getThoughts(req, res) {
        Thought.find()
        .populate('reactions')
        .then((Thoughts) => res.json(Thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getOneThought(req, res) {
        Thought.findOne({_id: req.params.thoughtID})
        .populate('reactions')
        .select('-__v')
        .then((thought)=> !thought  
        ?  res.status(404).json({message: 'No Thought matches that ID'})
        : res.json(thought))
        .catch((err)=> res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
        .then((newThought) => {
            console.log(newThought)
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: newThought._id } },
                { new: true }
              );
        })
        .then((user)=>
        !user? res.status(404).json({message: 'Thought created, but no user found with the id...'})
        : res.json(user)
        ).catch((err)=> {
            res.status(500).json(err);
        });
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtID },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then((thought)=> {
            return User.findOneAndUpdate(
                { username: thought.username},
                { $set: { thoughts: thought._Id } },
                { new: true }
            );
        })
        .then((thought) => 
        !thought
        ? res.status(404).json({message: 'No Thought with this ID'})
        : res.json(thought))
        .catch((err)=> res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete(
            { _id: req.params.thoughtID })
           
            .then((thought)=> {
                return User.findOneAndUpdate(
                    { username: thought.username},
                    { $unset: { thoughts: thought._id } },
                    { new: true }
                );
            })
            
            .then((thought)=> 
            !thought
            ? res.status(404).json({message: 'No Thought with this ID',thought})
            : res.json({msg: 'THOUGHT DELETED',thought}))
            .catch((err)=> res.status(500).json(err));
    },  
    addReaction(req, res) {
        
        console.log(req);
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtID },
            { $addToSet: { reactions: req.body} },
            { runValidators: true, new: true })
            .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No Thought found with that ID', thought })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtID },
            { $unset: { reactions: req.params.reactionID } },
            { runValidators: true, new: true }
        )
        .then((thought)=> 
        !thought
        ? res .status(404)
        .json({message: 'no Thought found with that ID.'})
        : res.json(thought))
        .catch((err)=> res.status(500).json(err))
    }
};