import React from 'react';
import Api from '../Api.js';
import { Button } from 'react-bootstrap';
import NavBar from './NavBar';
import { Chart } from 'react-google-charts';
import Footer from './Footer.js';

export default class AboutYou extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            features:[],
            value: "short_term",
            danceability: 0,
            tempo: 0,
            speechiness: 0,
            valence: 0,
            energy: 0,
            duration: 0
        };
        this.getFeatures = this.getFeatures.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount(){
        await this.getFeatures();
    }

    async getFeatures(){
        let api = new Api();
        let arr = await api.getFeatures(this.state.value, this.state.limit);
        this.setState({features: arr});

        this.getAverage(this.state.features, "danceability");
        this.getAverage(this.state.features, "tempo");
        this.getAverage(this.state.features, "speechiness");
        this.getAverage(this.state.features, "valence");
        this.getAverage(this.state.features, "energy");
        this.getAverage(this.state.features, "duration_ms")
        console.log(this.state);
    }

    getAverage(features, feature){
        var average = 0;
        if(feature === "danceability"){
            for(var i = 0; i < features.length; i++){
                average = average + features[i].danceability;
            }
            average = average / 15;
            this.setState({danceability: average});
        }
        else if(feature === "tempo"){
            for(var i = 0; i < features.length; i++){
                average = average + features[i].tempo;
            }
            average = average / features.length;
            this.setState({tempo: average/200});
        }
        else if(feature === "duration_ms"){
            for(var i = 0; i < features.length; i++){
                average = average + features[i].duration_ms;
            }
            //time conversion
            average = average*.001;
            average = average/60;
            average = average / features.length;
            this.setState({duration: average/6});
        }
        else if(feature === "speechiness"){
            for(var i = 0; i < features.length; i++){
                average = average + features[i].speechiness;
            }
            average = average / features.length;
            this.setState({speechiness: average});
        }
        else if(feature === "valence"){
            for(var i = 0; i < features.length; i++){
                average = average + features[i].valence;
            }
            average = average / features.length;
            this.setState({valence: average});
        }
        else if(feature === "energy"){
            for(var i = 0; i < features.length; i++){
                average = average + features[i].energy;
            }
            average = average / features.length;
            this.setState({energy: average});
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render(){
        return(
            <div style={{display:'grid'}}>
                <NavBar activeKey="/aboutyou"></NavBar>

                <h1>Your Musical Taste</h1>
                <h5>Based on the features of your favorite tracks</h5>

                <div className="tracks-container" style={{maxHeight: '90vh', overflow: 'scroll', margin:45}}>
                <a href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/" style={{color: '#28a745'}}>See https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/ for more info.</a>
                <Chart
                    width={'100%'}
                    height={'60vh'}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Taste', 'Your Stats', 'Average Listener'],
                        ['Danceability', this.state.danceability, .675],
                        ['Tempo (1 being 200 bpm)', this.state.tempo, .6],
                        ['Speechiness (average is .3-.6)', this.state.speechiness, .495],
                        ['Valence', this.state.valence, .5],
                        ['Energy', this.state.energy, .75],
                        ['Duration (1 being 6 minutes)', this.state.duration, .65],
                    ]}
                    options={{
                        title: 'Taste',
                        chartArea: { width: '50%' },
                        colors: ['#28a745', 'black'],
                        hAxis: {
                        title: 'Scaled scores',
                        minValue: 0,
                        },
                        vAxis: {
                        title: 'Features',
                        },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '4' }}
                    />
                <p></p>
                </div>

                <div className="buttons" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-35px'}}>

                    <Button variant="success" onClick={() => this.getFeatures()} style={{margin: 5, color: 'black'}}>Get Features</Button>

                    <select value={this.state.value} onChange={this.handleChange} style={{margin:5}}>
                        <option value="short_term">Short Term</option>
                        <option value="medium_term">Medium Term</option>
                        <option value="long_term">Long Term</option>
                    </select>
                </div>
                <Footer></Footer>
            </div>
            
        );
    }

}