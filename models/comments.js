var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    created: Date, 
    updated: Date, 
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }, 
    updatedBy: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);