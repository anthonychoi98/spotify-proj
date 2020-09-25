import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import { Button } from 'react-bootstrap/';
import Spotify from 'spotify-web-api-js';
import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage.js';
import TracksPage from './components/TracksPage';
import Other from './components/Other.js';
import GenresPage from './components/GenresPage.js';
import AboutYou from './components/AboutYou.js';
import SearchUserPage from './components/SearchUserPage.js';

const spotifyApi = new Spotify();

const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    //find a better way to check if user is logged in bc sometimes accesstoken is expired...
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem('access_token') && localStorage.getItem('email')) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

class App extends React.Component{

  render(){
    return (
      <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <ProtectedRoute exact path="/tracks" component={TracksPage} />
          <ProtectedRoute exact path="/other" component={Other} />
          <ProtectedRoute exact path="/genres" component={GenresPage}/>
          <ProtectedRoute exact path="/aboutyou" component={AboutYou}/>
          <ProtectedRoute exact path="/searchuser" component={SearchUserPage}/>
          <Route path="*" component={TracksPage} />
        </Switch>

      </div>
      </Router>
    );
  }
}

export default App;
