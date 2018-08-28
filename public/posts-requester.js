    /**
     * @class Responsible for for requesting posts from the server
     */

class PostsRequester {
    constructor(postsRenderer) {
        this.postsRenderer = postsRenderer;    }
    fetchPosts() {
        $.get('posts', function(posts){
            console.log(posts)
        })
        .done((posts) => {this.postsRenderer.renderPosts(posts)})
    }
};

export default PostsRequester