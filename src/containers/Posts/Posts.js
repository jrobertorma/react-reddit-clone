import React from 'react';

class Posts extends React.Component {
    constructor (props) {
        super(props);
    
        this.state = {
            posts: []
        };
      }
    
      componentDidMount() {
        let postsRef = this.props.firebase.ref('/posts/');//nota que también vas a pasar a postRef como prop en todas las rutas
        postsRef.on('value', (snapshot) => {
            this.setState({
                posts: snapshot.val(),
                loading: false
            });
          //console.log(this.state.posts);
        });
      }

    handleUpvote(event, post, key) {
        event.preventDefault();

        this.props.firebase.ref('/posts/' + key).set({
            title: post.title,
            upvote: post.upvote + 1,
            downvote: post.downvote
        });
        /*
        console.log('event: ', event);
        console.log('post: ', post);
        console.log('key', key);
        */
    }
      
    handleDownvote = (event, post, key) => {
        event.preventDefault();

        this.props.firebase.ref('/posts/' + key).set({
            title: post.title,
            upvote: post.upvote,
            downvote: post.downvote + 1
        });
    }

    render(){
        let posts = this.state.posts;
        //let _this = this;

        const items = Object.keys(posts).map(
            (key) => {
                //let postReference = this.props.firebase.ref('/posts/'+key);
                //console.log(postReference);
                return (
                    <div key={key}>
                                <div>----------valor de key: {key}----------</div>
                                <div>Title: {posts[key].title}</div>
                                <div>Upvotes: { posts[key].upvote }</div>
                                <div>Downvotes: { posts[key].downvote }</div>
                                <button type="button" 
                                        onClick={ (event) => {
                                            this.handleUpvote( event, posts[key], key );
                                        } }>
                                    Upvote
                                </button>
                                <button type="button" 
                                        onClick={ (event) => {
                                            this.handleDownvote( event, posts[key], key );    
                                        } }>
                                    Downvote
                                </button>
                            </div>    
                );
            }
        );

        if(this.props.loading === 'true') {
            return(
                <div>
                    Loading...
                </div>
            );
        }
        
        return(
            <div className="Posts">
                SOY POSTS.JS
                {
                    items
                }
            </div>
        );
    };
}

export default Posts;