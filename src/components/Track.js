import React from 'react';
import PropTypes from 'prop-types';
import './Tracks.css';
import { Button } from 'react-bootstrap';

class Track extends React.Component{
    constructor(props){
        super(props);
  
    }
    
    render(){
        return(
            <div className="track" style={{display: 'flex', backgroundColor: "white", border: '1px solid black', borderRadius: '5px', margin:'5px', display: "flex"}}>
                <h1 className="tracktitle" style={{height: 45, fontSize: 25}}>{this.props.title}</h1>
                <p style={{fontSize: 15}}>by {this.props.artist}</p>
                <Button variant="success" onClick={(e) => this.props.onClickCallback(e, this.props.uri)} style={{color: 'black', height:30, width: 45, marginLeft: "auto", marginRight: 8, marginTop: 8}}>></Button>
            </div>
        ); 
    }
}

export default Track;

Track.propTypes = {
    title: PropTypes.string,
    artists: PropTypes.object,
    uri: PropTypes.string
  };