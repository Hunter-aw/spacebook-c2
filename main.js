var SpacebookApp = function () {
  var postsObj = {
    posts: [
    {text: "Hello world", id: 1, comments:[
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"}
    ]},
    {text: "Hello world", id: 2, comments:[
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"}
    ]},
    {text: "Hello world", id: 3, comments:[
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"}
    ]}
  ]
  };
  var posts = postsObj.posts

  // the current id to assign to a post
  var currentId = 4;
  var commentId = 1000
  var $posts = $('.posts')
  // var comments = [];
  // var $comments = $('.commentSection');

  var _findPostById = function (id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  }

  var createPost = function (text) {
    var post = {
      text: text,
      id: currentId,
      comments:  []
    }

    currentId += 1;

    posts.push(post);
  }

  var renderPosts = function () {
    $posts.empty();
    var source = $('#post-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(postsObj);
    $('.posts').append(newHTML);

  //   for (var i = 0; i < posts.length; i += 1) {
  //     var post = posts[i];
  //     let postComments = getComments(post.id)
  //     var commentsContainer = '<div class="comments-container">' + postComments + '<div class = "comment" > </div>' +
  //     '<input type="text" class="comment-name">' +
  //     '<button class="btn btn-primary add-comment">Post Comment</button> </div>'

  //     $posts.append('<div class="post" data-id=' + post.id + '>'
  //       + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
  //       commentsContainer + '</div>');
  //   }
  }

  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;

    var post = _findPostById(id);

    posts.splice(posts.indexOf(post), 1);
  }

  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
  }

  var findPostId = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post')
    var id = $clickedPost.data().id;
    return id;
  }

  var _createNewComment = function (text) {
    var newComment = {
      text: text,
      id: commentId
    }
    newComment.id ++;
    return newComment
  }
  
  var addComment = function (comment, postId){ 
    var newComment = _createNewComment(comment) ;
    var post = _findPostById(postId);
    post.comments.push(newComment);

  }
  var newComment = function(text) {
    var commentHtml = ('<div class="comment">' + text + '</div>')
    return commentHtml;
  }
  
  // var getComments = function (postId) {
  //   var post = _findPostById(postId)
  //   var commentSec = post.comments;
  //   var commentText = "";      
  //   for (var x =0; x < commentSec.length; x +=1) {
  
  //     var comment = commentSec[x].text
  //     var commentId = commentSec[x].commentId
  //     commentHtml = newComment(comment)
  //     commentText += commentHtml
  //   }
  //   let commentsDiv = '<div class =' + commentId + '>' + commentText + '</div>'
  //   commentText = ""; 
  //   return commentsDiv; 
  // }
  
  // var removeComment = function (currentComment) {
  //   var $clickedComment = $(currentComment).closest('.comment');
  //   var CommentId = $clickedComment.data().commentId;

  //   var post = _findCommentById(id);

  //   posts.splice(posts.indexOf(post), 1);
  // }

  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,
    createNewComment: _createNewComment,
    addComment: addComment,
    newComment: newComment,
    findPostId: findPostId,
    // getComments: getComments,
    // TODO: Implement
    // removeComment: removeComment,
    toggleComments: toggleComments
  }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();
  
  app.createPost(text);
  app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
  app.renderPosts()
});

$('.posts').on('click','.add-comment', function () {
  var comment = $(this).siblings('.comment-name').val()
  var postId = app.findPostId(this)
  // var $commentPost = $(this).closest('.comments-container')

  app.addComment(comment, postId);
  app.renderPosts();
});

$('.posts').on('click','.show-comments', function () {
  app.toggleComments(this);
});
