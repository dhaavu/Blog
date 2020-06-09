var mongoose = require("mongoose");

var blog = new mongoose.Schema({
   username: String,
   category: String, 
   image: String,
   title: String,
   description: String, 
   html: String, 
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   created: Date, 
   updated: Date, 
   updatedBy: {
    id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User"
    },
    username: String
 }, 
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("blog", blog);