import React from 'react';
import Api from '../Api.js';
import { Button } from 'react-bootstrap';
import NavBar from './NavBar';

export default class AboutYou extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            features:[],
            value: "short_term",
            limit: "5"
        };
        this.getFeatures = this.getFeatures.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }

    async getFeatures(){
        let api = new Api();
        let arr = await api.getFeatures(this.state.value, this.state.limit);
        this.setState({features: arr});
        console.log(this.state.features);
    }

    getAverage(features, feature){
        var average = 0;
        if(feature === "danceability"){
            for(var i = 0; i < features.length; i++){
                average = average + features[i].danceability;
            }
        }
        else if(feature === "tempo"){
            for(var i = 0; i < features.length; i++){
                average = average + features[i].tempo;
            }
        }
        else if(feature === "duration_ms"){
            for(var i = 0; i < features.length; i++){
                average = average + features[i].duration_ms;
            }
            //time conversion
            average = average*.001;
            average = average/60;
        }
        else if(feature === "speechiness"){
            for(var i = 0; i < features.length; i++){
                average = average + features[i].speechiness;
            }
        }
        else if(feature === "valence"){
            for(var i = 0; i < features.length; i++){
                average = average + features[i].valence;
            }
        }
        else if(feature === "energy"){
            for(var i = 0; i < features.length; i++){
                average = average + features[i].energy;
            }
        }
        

        average = average / features.length;

        return(<p>{average}</p>)
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
                <NavBar activeKey="/aboutyou"></NavBar>

                <h1>Your Musical Taste</h1>
                <h5>Based on the features of your favorite tracks</h5>

                <div className="tracks-container" style={{maxHeight: 430, overflow: 'scroll', margin:50, marginTop:25}}>
                See https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/ for more info.
                <p></p>
                Danceability (0-1): {this.getAverage(this.state.features, "danceability")}
                Tempo (bpm): {this.getAverage(this.state.features, "tempo")}
                Speechiness (wordy songs 0-1): {this.getAverage(this.state.features, "speechiness")}
                Valence (positivity 0-1): {this.getAverage(this.state.features, "valence")}
                Energy (intensity): {this.getAverage(this.state.features, "energy")}
                Duration (min): {this.getAverage(this.state.features, "duration_ms")}
                
             
                </div>

                <div className="buttons" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '-35px'}}>

                    <Button variant="success" onClick={() => this.getFeatures()} style={{margin: 5, color: 'black'}}>Get Features</Button>

                    <select value={this.state.value} onChange={this.handleChange} style={{margin:5}}>
                        <option value="short_term">Short Term</option>
                        <option value="medium_term">Medium Term</option>
                        <option value="long_term">Long Term</option>
                    </select>

                    <select value={this.state.limit} onChange={this.handleChange2} style={{margin:5}}>
                        <option value="5">Top 5</option>
                        <option value="10">Top 10</option>
                    </select>
                </div>
            </div>
            
        );
    }

}