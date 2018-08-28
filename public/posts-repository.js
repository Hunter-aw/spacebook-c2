    /**
     * @class Responsible for storing and manipulating Spacebook posts, in-memory
     */
class PostsRepository {
    constructor(postsRequester) {
        this.postsRequester = postsRequester
        this.posts = []//postsRequester.fetchPosts();
    }

    addPost(postText) {
        this.postsRequester.addPostsToDB(postText)
        // this.posts.push({ text: postText, comments: [] });
    }

    removePost(index, postId) {
        // this.posts.splice(index, 1);
        this.postsRequester.deletePost(postId)
    }
    
    addComment(newComment, postIndex) {
        this.posts[postIndex].comments.push(newComment);
    };

    deleteComment(postIndex, commentIndex) {
        this.posts[postIndex].comments.splice(commentIndex, 1);
      };
}

export default PostsRepository