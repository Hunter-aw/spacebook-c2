import PostsRepository from './posts-repository.js';
import PostsRenderer from './posts-renderer.js';
import EventsHandler from './events-handler.js'; 
import PostsRequester from './posts-requester.js';


let postsRenderer = new PostsRenderer();
let postsRequester = new PostsRequester(postsRenderer)
let postsRepository = new PostsRepository(postsRequester);
let eventsHandler = new EventsHandler(postsRepository, postsRenderer);

postsRepository.initializePost()
.then(() => {
    console.log('weve come this far')
    postsRenderer.renderPosts(postsRepository.posts)
})
eventsHandler.registerAddPost();
eventsHandler.registerRemovePost();
eventsHandler.registerToggleComments();
eventsHandler.registerAddComment();
eventsHandler.registerRemoveComment();