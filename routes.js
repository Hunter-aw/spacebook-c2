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
      if (err) throw err;
      else res.send(posts)
    })
})

router.post('/posts', (req, res) => {
  let newPost = new Post ({
    text: (req.body).text,
    comments: []
  })
  console.log(newPost)
  newPost.save()
  res.send(newPost)
})

router.delete('/delete', (req, res) => {
  Post.findByIdAndRemove((req.body.id), (err, post) => {
    if (err) throw err;
    else res.send(post)
  })
})

router.post('/comment', (req, res ) => {
  Post.findByIdAndUpdate(req.body.postId, 
    {$push: 
      { comments: 
        {text: req.body.text,
         user: req.body.user}
      }
    }, null).exec() 
  .then(() => {Post.findById((req.body.postId), (err, post) => {
    if (err) throw err;
    else {res.send(post)}
    })
  })
})

router.delete('/deletecomment', (req, res) => {
  Post.findByIdAndUpdate(req.body.postId, 
    {$pull: 
      {comments: {
        _id: req.body.commentId}
      }
    }, null).exec()
    .then(() => {Post.findById((req.body.postId), (err, post) => {
      if (err) throw err;
      else res.send(post)
    })
  })
})

module.exports = router