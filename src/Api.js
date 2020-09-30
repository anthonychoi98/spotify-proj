import React from 'react';
import { Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';

class Api extends React.Component{

    async getUserInfo(){
        let response = await fetch("https://api.spotify.com/v1/me", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('access_token')
                }
            }
        );

        let json = await response.json();
    
        return json;

    }

    async getTopArtists(value){
        let arr = [];
        let params = "time_range=" + value + "&limit=12";
        let response = await fetch("https://api.spotify.com/v1/me/top/artists?" + params, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('access_token')
                }
            }
        );
    
        let json = await response.json();

        json.items.forEach(item => arr.push(item.name));

        return arr;
    }

    //sql query values can't have names with apostrophes so you have to use double ''
    formatText = (text) => {
        var res = text.replace(/'/gi, "''");
        return res;
    }

    async getTopUserTracks(email, period){
        if(period === 'short_term'){
            let response = await fetch('https://spotifyloginapi.herokuapp.com/getshort_term', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: email})
              });

            let json = await response.json();

            return json;
        }
        else if(period === 'medium_term'){
            let response = await fetch('https://spotifyloginapi.herokuapp.com/getmedium_term', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: email})
              });
            let json = await response.json();
            return json;
        }
        else if(period === 'long_term'){
            let response = await fetch('https://spotifyloginapi.herokuapp.com/getlong_term', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: email})
              });

            let json = await response.json();
            return json;
        }
    }

    async getTopTracks(value, limit){
        let arr = [];
        let params = "time_range=" + value + "&limit=" + limit;

        let response = await fetch("https://api.spotify.com/v1/me/top/tracks?" + params, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('access_token')
                }
            }
        );

        let json = await response.json();

        json.items.forEach(item => {
            arr.push({user: localStorage.getItem('email'), name: this.formatText(item.name), artist: this.formatText(item.artists[0].name), uri: item.uri, period: value, date: new Date()});
        });

        fetch('https://spotifyloginapi.herokuapp.com/addTracks', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(arr)
          });

        return arr;
    }  

    async getTopGenres(value){
        let arr = [];
        let genres=[{genre: 'rap', count: 0}, {genre:'electro', count: 0}, {genre:'american', count: 0}, {genre:'progressive', count: 0}, {genre:'hip hop', count: 0}, {genre: 'korean', count: 0}, {genre: 'hyphy', count: 0}, {genre: 'electronic', count: 0}, {genre: 'trap', count: 0}, {genre: 'edm', count: 0}, {genre: 'indie', count: 0}, {genre: 'pop', count: 0}, {genre: 'alternative', count: 0}, {genre: 'punk', count: 0}, {genre: 'rock', count: 0}, {genre: 'uk', count: 0}, {genre: 'bass', count: 0}, {genre: 'house', count: 0}, {genre: 'metal', count: 0}, {genre: 'dance', count: 0}, {genre: 'j-pop', count: 0}, {genre: 'j-rock', count: 0}, {genre: 'classical', count: 0}, {genre: 'french', count: 0}, {genre: 'techno', count: 0}, {genre: 'spanish', count: 0}, {genre: 'screamo', count: 0}, {genre: 'bay area', count: 0}, {genre: 'funk', count: 0}, {genre: 'modern', count: 0}, {genre: 'contemporary', count: 0}, {genre: 'r&b', count: 0}, {genre: 'soul', count: 0}, {genre: 'country', count: 0}, {genre: 'jazz', count: 0}, {genre: 'blues', count: 0}, {genre: 'folk', count: 0}, {genre: 'latin', count: 0}, {genre: 'k-pop', count: 0}, {genre: 'k-rock', count: 0}, {genre: 'anime', count: 0}];
        let params = "time_range=" + value + "&limit=15";
        let response = await fetch("https://api.spotify.com/v1/me/top/artists?" + params, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('access_token')
                }
            }
        );
    
        let json = await response.json();
        
        json.items.forEach(item => item.genres.forEach(genre => arr.push(genre)));

        for(var i = 0 ; i < arr.length;i++){
            var item = arr[i];
            for(var j = 0; j < genres.length; j++){
                if(item.includes(genres[j].genre)){
                    genres[j].count = genres[j].count+1;
                }
            }
        }

        genres.sort((a, b) => (a.count > b.count) ? -1 : 1);

        return genres;
    }

    async getFeatures(value, limit){
        let arr = [];
        let features = [];
        let params = "time_range=" + value + "&limit=15";

        //get track ids
        let response = await fetch("https://api.spotify.com/v1/me/top/tracks?" + params, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('access_token')
                }
            }
        );

        let json = await response.json();

        json.items.forEach(item => arr.push(item.id));
        
        for(var i = 0; i < arr.length; i++){
            let response2 = await fetch("https://api.spotify.com/v1/audio-features/" + arr[i], {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ localStorage.getItem('access_token')
                    }
                }
            );

            let json = await response2.json();

            features.push(json);
        }
       



        return features;
        
    }
 
}

export default Api;
