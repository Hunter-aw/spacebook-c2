var mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
    text: String,
    user: String
});


let postSchema = new mongoose.Schema({
    text: String,
    comments: [commentSchema]
});

let Post = mongoose.model('post', postSchema)

module.exports = Post
