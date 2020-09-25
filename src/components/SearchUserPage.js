import React from 'react';
import NavBar from './NavBar';
import Button from 'react-bootstrap/esm/Button';
import SpotifyPlayer from 'react-spotify-player';
import Track from './Track';
import Api from '../Api.js';

export default class SearchUserPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            tracks:[],
            value: 'short_term',
            email: '',
            currTrack:''
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getTracks = this.getTracks.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
    }

    inputHandler = (event) => {
        this.setState({email: event.target.value});
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }   

    handlePlay(e, uri){
        this.setState({currTrack: uri})
    }

    async getTracks(){
        let api = new Api();

        let arr = await api.getTopUserTracks(this.state.email.toLowerCase(), this.state.value);
        
        this.setState({tracks: arr});
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
                <NavBar activeKey="/searchuser"></NavBar>

                <h4>Enter user's email to see they tracks</h4>

                <input text='email' onChange={this.inputHandler}></input>

                <select value={this.state.value} onChange={this.handleChange} style={{margin:5}}>
                    <option value="short_term">Short Term</option>
                    <option value="medium_term">Medium Term</option>
                    <option value="long_term">Long Term</option>
                </select>

                <Button variant="success" onClick={() => this.getTracks()} style={{margin: 5, color: 'black'}}>Get Top Tracks</Button>
            
                <div className="tracks-container" style={{maxHeight: 430, overflow: 'scroll', margin:50, marginTop:20, marginBottom: 25}}>

                    {this.state.tracks.map((track, indx) => 
                        <Track key={indx} title={track.TRACK} artist={track.ARTIST} uri={track.URI} onClickCallback={this.handlePlay.bind(this)}></Track>
                    )}

                </div>


                <SpotifyPlayer
                    uri={this.state.currTrack}
                    size={size}
                    view={view}
                    theme={theme}
                />
            </div>
        );
    }
}