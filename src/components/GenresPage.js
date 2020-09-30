import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Spotify from 'spotify-web-api-js';
import Track from './Track';
import NavBar from './NavBar';
import Api from '../Api.js';
import { Chart } from 'react-google-charts';
import Footer from './Footer.js';

const spotifyApi = new Spotify();

export default class GenresPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            genres: [{genre: 'pseudo_pop:', count: 10}, {genre: 'pseudo_edm:', count: 10}, {genre: 'pseudo_rap:', count: 10}, {genre: 'pseudo_indie:', count: 10},{genre: 'pseudo_rock:', count: 10}],
            value: 'short_term',
            limit: '50'
        };
        this.getGenres = this.getGenres.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount(){
        await this.getGenres();
    }

    async getGenres(){
        let api = new Api();
        let arr = await api.getTopGenres(this.state.value, this.state.limit);
        this.setState({genres: arr.slice(0,5)});
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render(){
        return(
        <div style={{display:'grid'}}>
            <NavBar activeKey="/genres"></NavBar>

            <h1>Your Top Genres!</h1>
            <div className="genres-container" style={{maxHeight: '65vh', overflow: 'scroll', margin:50, marginTop:25}}>

            <Chart
                    width={'100%'}
                    height={'65vh'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['random', 'Hours per Day'],
                        [this.state.genres[0].genre, this.state.genres[0].count],
                        [this.state.genres[1].genre, this.state.genres[1].count],
                        [this.state.genres[2].genre, this.state.genres[2].count],
                        [this.state.genres[3].genre, this.state.genres[3].count],
                        [this.state.genres[4].genre, this.state.genres[4].count],
                    ]}
                    options={{
                        title: 'Genres',
                        slices: {
                            0: { color: '#28a745' },
                            1: { color: 'black' },
                            2: { color: '#247036'},
                            3: { color: 'rgb(94, 94, 94)' },
                            4: { color: '#0f411a' }
                          }
                    }}
                    rootProps={{ 'data-testid': '1' }}
                    /> 

            </div>

            <div className="buttons" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-38px'}}>
                
                <Button variant="success" onClick={() => this.getGenres()} style={{margin: 5, color: 'black'}}>Get Top Genres</Button>

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