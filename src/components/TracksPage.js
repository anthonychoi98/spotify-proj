import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Spotify from 'spotify-web-api-js';
import Track from './Track';
import NavBar from './NavBar';
import Api from '../Api.js';
import SpotifyPlayer from 'react-spotify-player';


const spotifyApi = new Spotify();

export default class TracksPage extends React.Component{

    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            tracks: [],
            value: 'short_term',
            limit: '10',
            currTrack: ''
        };
        this.getTracks = this.getTracks.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }

    async getTracks(){

        let api = new Api();
        console.log(this.state.value, this.state.limit);
        let arr = await api.getTopTracks(this.state.value, this.state.limit);
      
        this.setState({tracks: arr});
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleChange2(event) {
        this.setState({limit: event.target.value});
    }

    handlePlay(e, uri){
        this.setState({currTrack: uri})
    }

    render(){
        const size = {
            width: '100%',
            height: 80,
          };
        const view = 'list'; // or 'coverart'
        const theme = 'black'; // or 'white'
        return(
        <div>
            <NavBar activeKey="/tracks"></NavBar>

            <h1>Your Top Tracks!</h1>
            <div className="tracks-container" style={{maxHeight: 430, overflow: 'scroll', margin:50, marginTop:25}}>

                {this.state.tracks.map((track, indx) => 
                    <Track key={indx} title={track.name} artist={track.artist} uri={track.uri} onClickCallback={this.handlePlay.bind(this)}></Track>
                )}

            </div>

            <div className="buttons" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '-35px'}}>
                
                <Button variant="success" onClick={() => this.getTracks()} style={{margin: 5, color: 'black'}}>Get Top Tracks</Button>

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
         
            <p>.</p>
            <SpotifyPlayer
                uri={this.state.currTrack}
                size={size}
                view={view}
                theme={theme}
            />
        </div>
        );
    };

}