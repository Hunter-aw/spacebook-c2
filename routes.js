const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/spacebookDB', function() {
  console.log("DB connection established!!!");
})
var Post = require('./models/postModel');
const router = express.Router()
// console.log(Post)

router.get('/posts', (req, res) => {
    console.log("I'm here bitches")
    Post.find({}, (err, posts) =>{
      console.log("help me")
      if (err) throw err;
      else res.send(posts)
    })
})

module.exports = router