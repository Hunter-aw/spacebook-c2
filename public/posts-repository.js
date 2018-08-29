    /**
     * @class Responsible for storing and manipulating Spacebook posts, in-memory
     */
class PostsRepository {
    constructor(postsRequester) {
        this.postsRequester = postsRequester
        this.posts = []//postsRequester.fetchPosts();
    }
    initializePost() {
        return this.postsRequester.fetchPosts().then((posts) => {
            this.posts = posts
        });
    };
    
    addPost(postText) {
        return this.postsRequester.addPostsToDB(postText)
        .then((newPost) => {
            this.posts.push(newPost); 
            console.log('added new post')
        });
    };

    removePost(index, postId) {
        return this.postsRequester.deletePost(postId)
        .then(() => {
            this.posts.splice(index, 1); 
            console.log('post succesfully removed')
        });
    };
    
    addComment(newComment, postIndex, postId) {
        return this.postsRequester.addComment(postId, newComment)
        .then((post) => {
            this.posts[postIndex].comments.push((post).comments[post.comments.length-1]);
            console.log('added new comment')
        });   
    };

    deleteComment(postIndex, commentIndex, postId, commentId) {
        return this.postsRequester.deleteComment(postId, commentId)
        .then(() => {
            this.posts[postIndex].comments.splice(commentIndex, 1)
            console.log('deleted comment')
        });
      };
}

export default PostsRepository