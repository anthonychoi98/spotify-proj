import React from 'react';
import {Button, Dropdown} from 'react-bootstrap/';
import Spotify from 'spotify-web-api-js';
import Api from '../Api.js'
import NavBar from './NavBar';
import Artist from './Artist.js';
import Footer from './Footer.js';

export default class Other extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            artists:[],
            value: 'short_term'
        };
        this.getArtists = this.getArtists.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount(){
        await this.getArtists();
    }

    async getArtists(){

        let api = new Api();
        let arr = await api.getTopArtists(this.state.value);
      
        this.setState({artists: arr});
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render(){
        return(
        <div style={{display:'grid'}}>
            <NavBar activeKey="/other"></NavBar>

            <h1>Your Top Artists!</h1>
            <div className="artists-container" style={{maxHeight: '65vh', overflow: 'scroll', margin:50, marginTop:25}}>

                {this.state.artists.map((artist, indx) => 
                    <Artist name={artist}>{indx+1}: {artist}</Artist>
                )}
            </div>
            
            <div className="buttons" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-30px'}}>
                
                <Button variant="success" onClick={() => this.getArtists()} style={{margin: 5, color: 'black'}}>Get Top Artists</Button>

                <select value={this.state.value} onChange={this.handleChange} style={{margin:5}}>
                    <option value="short_term">Short Term</option>
                    <option value="medium_term">Medium Term</option>
                    <option value="long_term">Long Term</option>
                </select>
            </div>   
            <Footer></Footer>
        </div>
        );
    };
}