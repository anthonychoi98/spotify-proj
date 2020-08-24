import React from 'react';
import {Button, Dropdown} from 'react-bootstrap/';
import Spotify from 'spotify-web-api-js';
import Api from '../Api.js'
import NavBar from './NavBar';
import Artist from './Artist.js';


export default class Other extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            artists:[],
            value: 'short_term',
            limit: '10'
        };
        this.getArtists = this.getArtists.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }

    async getArtists(){

        let api = new Api();
        let arr = await api.getTopArtists(this.state.value, this.state.limit);

        console.log('arr', typeof(arr));
      
        this.setState({artists: arr});

        if (!Array.isArray(typeof(arr))){
            console.log('is array', arr);
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleChange2(event) {
        this.setState({limit: event.target.value});
    }

    render(){
        return(
        <div>
            <NavBar activeKey="/other"></NavBar>

            <h1>Your Top Artists!</h1>
            <div className="artists-container" style={{maxHeight: 500, overflow: 'scroll', margin:50, marginTop:25}}>

                {this.state.artists.map((artist, indx) => 
                    <Artist name={artist}>{indx+1}: {artist}</Artist>
                )}
            </div>

            <div className="buttons" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '-35px'}}>
                
                <Button variant="success" onClick={() => this.getArtists()} style={{margin: 5, color: 'black'}}>Get Top Artists</Button>

                <select value={this.state.value} onChange={this.handleChange} style={{margin:5}}>
                    <option value="short_term">Short Term</option>
                    <option value="medium_term">Medium Term</option>
                    <option value="long_term">Long Term</option>
                </select>

                <select value={this.state.limit} onChange={this.handleChange2} style={{margin:5}}>
                    <option value="10">Top 10</option>
                    <option value="20">Top 20</option>
                    <option value="50">Top 50</option>
                </select>

            </div>
        </div>
        );
    };
}