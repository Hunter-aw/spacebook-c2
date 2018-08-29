class EventsHandler {
    constructor(postsRepository, postsRenderer, postsRequester) {
        this.postsRepository = postsRepository;
        this.postsRenderer = postsRenderer;
        this.postsRequester=postsRequester
        this.$posts = $(".posts");
    }

    registerAddPost() {
        $('#addpost').on('click', () => {
            let $input = $("#postText");
            if ($input.val() === "") {
                alert("Please enter text!"); 
            } else {
                this.postsRepository.addPost($input.val())
                .then(() => this.postsRenderer.renderPosts(this.postsRepository.posts))
                $input.val("");
            }
            });        
    }

    registerRemovePost() {
        this.$posts.on('click', '.remove-post', (event) => {
            let index = $(event.currentTarget).closest('.post').index();
            let postId =$(event.currentTarget).closest('.post').data().id
            this.postsRepository.removePost(index, postId)
            .then(() => this.postsRenderer.renderPosts(this.postsRepository.posts));
          });

    }

    registerToggleComments() {
        this.$posts.on('click', '.toggle-comments', (event) => {
            let $clickedPost = $(event.currentTarget).closest('.post');
            $clickedPost.find('.comments-container').toggleClass('show');
          });
    }

    registerAddComment() {
        this.$posts.on('click', '.add-comment', (event) => {
            let $comment = $(event.currentTarget).siblings('.comment');
            let $user = $(event.currentTarget).siblings('.name');
          
            if ($comment.val() === "" || $user.val() === "") {
              alert("Please enter your name and a comment!");
              return;
            }
          
            let postIndex = $(event.currentTarget).closest('.post').index();
            let newComment = { text: $comment.val(), user: $user.val() };
            let postId =$(event.currentTarget).closest('.post').data().id
            this.postsRepository.addComment(newComment, postIndex, postId)
            .then(() => this.postsRenderer.renderComments(this.postsRepository.posts, postIndex));
            $comment.val("");
            $user.val("");
          });

    }

    registerRemoveComment() {
        this.$posts.on('click', '.remove-comment', (event) => {
            let postIndex = $(event.currentTarget).closest('.post').index();
            let commentIndex = $(event.currentTarget).closest('.comment').index();
            let postId = $(event.currentTarget).closest('.post').data().id
            let commentId = $(event.currentTarget).closest('.comment').data().id
            this.postsRepository.deleteComment(postIndex, commentIndex, postId, commentId)
            .then(() => this.postsRenderer.renderComments(this.postsRepository.posts, postIndex));
        });
    }
}

export default EventsHandler