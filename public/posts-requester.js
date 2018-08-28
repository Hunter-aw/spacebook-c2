    /**
     * @class Responsible for for requesting posts from the server
     */

class PostsRequester {
    fetchPosts() {
        return $.get('posts', function(posts){
            console.log(posts)
        })
    }
    addPostsToDB(post) {
        return $.post('posts', {text: post}, function(post){
            console.log(post)
        })
        .catch((err)=> {throw err})
    }
    deletePost(id) {
        return $.ajax({
            method: 'delete',
            url: 'delete',
                data: {id: id}
        })
        .then(() => {console.log('post successfuly deleted')})
        .catch((err)=> {throw err})
    }
    addComment(postId, comment) {
        console.log(comment)
        return $.post('comment', {postId: postId, text: comment.text, user: comment.user}, function(post){
            console.log(JSON.stringify(post) + "before addition")
        })
        .catch ((err)=> {throw err})
        // .then((post) => console.log(post + "after addition"))
    }  
};

export default PostsRequester