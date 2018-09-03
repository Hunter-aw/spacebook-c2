var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var debug = require('debug')('myapp');
  

const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/spacebookDB', function() {
  console.log("DB connection established!!!");
})

var Post = require('./models/postModel');
const api = require('./routes')

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));// Set Api Routes
app.use('/', api)


// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments
// 2) to handle adding a post
// 3) to handle deleting a post
// 4) to handle adding a comment to a post
// 5) to handle deleting a comment from a post

app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});


// let post1 = new Post ({
//   text: "I like so totally love spacebook",
//   comments: []
// })
// post1.comments.push({text: "Wow you're so cool", user: "Michele"})
// post1.comments.push({text: "ugh I wish I was you", user: "LaShawnda"})
// post1.save()

// let post2 = new Post ({
//   text: "I wonder if monkeys know they're monkeys?",
//   comments: []
// })
// post2.comments.push({text: "Omg so insightful", user: "Dahrell"})
// post2.comments.push({text: "you littttterally just changed my life", user: "LaShawnda"})
// post2.save()
