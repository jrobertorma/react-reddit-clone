import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import App from './containers/App/App.js';
import Posts from './containers/Posts/Posts.js';

import * as firebase from "firebase/app";
import config from './containers/App/firebase-config.js';
import AddPost from "./containers/Posts/AddPost.js";
require('firebase/database');

firebase.initializeApp(config);

class Routes extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      posts: [],
      loading: false
    };
  }

  componentDidMount() {
    let postsRef = firebase.database().ref('posts');//nota que también vas a pasar a postRef como prop en todas las rutas
    postsRef.on('value', (snapshot) => {
      /*let items = snapshot.val();
      let newState = [];
      
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title
        });
      }*/

      this.setState({
        posts: snapshot.val(),
        loading: false
      });

      //console.log(this.state.posts);
    });
  }

  render(){
    let firebaseDb = firebase.database();//nota que también vas a pasar a postRef como prop en todas las rutas

    return(
      <Router>
        <div className="App">
          <div>APPCONTAINER en routes</div>
          
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                  <Link to="/posts">Posts</Link>
              </li>
              <li>
                <Link to="/add-post">Add Post</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/posts">
              <Posts firebase={firebaseDb} loading={this.state.loading.toString()}/>
            </Route>
            <Route path="/add-post">
              <AddPost firebase={firebaseDb} loading={this.state.loading.toString()}/>
            </Route>
            <Route path="/users">
              <Users firebase={firebaseDb} loading={this.state.loading.toString()}/>
            </Route>
            <Route path="/">
              <App firebase={firebaseDb} loading={this.state.loading.toString()}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  };
}

function Users() {
  return <h2>Users</h2>;
}

export default Routes;