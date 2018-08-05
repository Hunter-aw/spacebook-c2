const POSTSECTION = $('.posts')
const POSTARRAY = []

function genIdNumber() {
    return Math.floor(Math.random() * 1000000000);
}

function collectPost () {
    let postName = $('#post-name').val()
    return postName
}

function createNewPost(postInput) {
    let newPost = {
        text: postInput,
        id: genIdNumber()
    }
    POSTARRAY.push(newPost)
}

function removeFromArray() {
    let inputParagraph = $(this).parent()
    let inputId = inputParagraph.attr('data-id')
    let inputIdNumber = parseInt(inputId)
    for (post of POSTARRAY) {
        if (inputIdNumber === (post.id)) {
            let postIndex = POSTARRAY.indexOf(post)
            POSTARRAY.splice(postIndex, 1)
        }
    } 
}

function removePost() {
    // removeFromArray() I need an arrow function to slove this, but am stuck
    renderPost()
}

function createNewButton() {
    let newButton = ($('<button>'))
    newButton.attr('type', 'button')
    newButton.addClass('remove')
    newButton.text('remove')
    newButton.click(removeFromArray)
    newButton.click(removePost)
    return newButton
}

function addPostToSection() {
    for (post of POSTARRAY) {
        let newP = ($('<p>'))
        newP.text(post.text)
        newP.attr('data-id', (post.id))
        newP.addClass('post')
        newP.append(createNewButton())
        POSTSECTION.append(newP)
    }
}

function renderPost() {
    POSTSECTION.empty();
    addPostToSection()

}

function postPost() {
    createNewPost(collectPost())
    renderPost()
}

// $('.remove').on('click', '.post', function () {
//     $(this).remove();
//   });


// $(document).ready(function(){
//     $('form').keypress(function(e){
//       if(e.keyCode==13)
//       $('.add-post').click();
//     });
// });
