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
        .catch((err)=> {throw err})
    }
    addPostsToDB(post) {
        $.post('posts', {text: post}, function(post){console.log(post)})
        .done(() => {console.log('post successfuly added')})
        .catch((err)=> {throw err})
    }
};

export default PostsRequester