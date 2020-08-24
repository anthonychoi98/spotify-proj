import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Spotify from 'spotify-web-api-js';
import Track from './Track';
import NavBar from './NavBar';
import Api from '../Api.js';
import Genre from './Genre.js';

const spotifyApi = new Spotify();

export default class GenresPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            genres: [],
            value: 'short_term',
            limit: '50',
            listLimit: '5'
        };
        this.getGenres = this.getGenres.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }

    async getGenres(){

        let api = new Api();
        let arr = await api.getTopGenres(this.state.value, this.state.limit);
      
        this.setState({genres: arr});
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleChange2(event) {
        this.setState({listLimit: event.target.value});
    }

    render(){
        return(
        <div>
            <NavBar activeKey="/genres"></NavBar>

            <h1>Your Top Genres!</h1>
            <div className="genres-container" style={{maxHeight: 500, overflow: 'scroll', margin:50, marginTop:25}}>

                {this.state.genres.slice(0, this.state.listLimit).map((genre, indx) => 
                    <Genre genre={genre.genre} key={indx}></Genre>
                )}

            </div>

            <div className="buttons" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '-35px'}}>
                
                <Button variant="success" onClick={() => this.getGenres()} style={{margin: 5, color: 'black'}}>Get Top Genres</Button>

                <select value={this.state.value} onChange={this.handleChange} style={{margin:5}}>
                    <option value="short_term">Short Term</option>
                    <option value="medium_term">Medium Term</option>
                    <option value="long_term">Long Term</option>
                </select>

                <select value={this.state.listLimit} onChange={this.handleChange2} style={{margin:5}}>
                    <option value="5">Top 5</option>
                    <option value="10">Top 10</option>
                    <option value="15">Top 15</option>
                </select>

            </div>
        </div>
        );
    };

}