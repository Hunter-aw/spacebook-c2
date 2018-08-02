var SpacebookApp = function () {
  return {
    posts: [],
    // the current id to assign to a post
    currentId: 0,
    $posts: $('.posts'),

    _findPostById: function (id) {
      for (var i = 0; i < this.posts.length; i += 1) {
        if (this.posts[i].id === id) {
          return this.posts[i];
        }
      }
    },

    createPost: function (text) {
      var post = {
        text: text,
        id: this.currentId
      };

      this.currentId += 1;

      this.posts.push(post);
    },

    renderPosts: function () {
      this.$posts.empty();

      for (var i = 0; i < this.posts.length; i += 1) {
        var post = this.posts[i];
        this.$posts.append('<p class="post" data-id=' + post.id + '>'
          + '<a href="#" class="remove">remove</a> ' + post.text + '</p>');

      }
    },

    removePost: function (currentPost) {
      var $clickedPost = $(currentPost).closest('.post');
      var id = $clickedPost.data().id;

      var post = this._findPostById(id);

      this.posts.splice(this.posts.indexOf(post), 1);
    }
  };
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

$('.posts').on('click', 'a', function () {
  app.removePost(this);
  app.renderPosts();
});
