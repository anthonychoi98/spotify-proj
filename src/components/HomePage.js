import React from 'react';
import { Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spotify from 'spotify-web-api-js';
import { Redirect, BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import NavBar from './NavBar.js';
import { thisExpression } from '@babel/types';
import Api from '../Api.js';

const spotifyApi = new Spotify();
const api = new Api();

class HomePage extends React.Component{

  constructor(props){
    super(props);
    const params = this.getHashParams();
    this.state={
      loggedIn: localStorage.getItem('access_token') ? true : false,
      nowPlaying:{
        name: 'Not Checked',
        image: ''
      },
      user_email: ''
    }
    if(params.access_token){
      spotifyApi.setAccessToken(params.access_token);
      localStorage.setItem('access_token', params.access_token);
    }
  }
  
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  render(){
    const size = {
      width: '100%',
      height: 300,
    };
    const view = 'coverart'; // or 'coverart'
    const theme = 'white'; // or 'white'
    
    return (
      <div className="home-page">

        <NavBar activeKey="/"></NavBar>

        <h1 style={{marginTop:25}}>Your Spotify</h1>

        { (this.state.loggedIn) ? 

        <p>Welcome! 

        Short term: ~ 1 month
        Medium term: ~ 6 months
        Long term: ~ 3 years

        </p> :
        
        <a href="https://spotifyloginapi.herokuapp.com/login">
            <Button className="app-button" variant="success" size="lg" style={{marginTop:10, color: 'black'}}>
              Log In
            </Button>{' '}
          </a>
          
        }

                 
      </div>
    );
  }
}

export default HomePage;
