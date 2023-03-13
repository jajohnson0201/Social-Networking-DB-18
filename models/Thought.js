const { Schema, model } = require('mongoose');

// import reactionScema for thought obj.

const thoughtSchema = new Schema(
    {
        thoughtText: {
            
        },
        createdAt: {
            
        },
        username:{

        },
        reactions: []
    }
);
const Thought = model('thought', thoughtSchema);

module.exports = Thought;