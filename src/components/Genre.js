import React from 'react';
import PropTypes from 'prop-types';

class Artist extends React.Component{
    constructor(props){
        super(props);  
    }

    render(){
        return(
            <div className="genre" style={{display: 'flex', backgroundColor: "white", border: '1px solid black', borderRadius: '5px', margin:'5px'}}>
                <h1 className="genre-name" style={{height: 45, fontSize: 25}}>{this.props.genre}</h1>
            </div>
        ); 
    }
}

export default Artist;

Artist.propTypes = {
    name: PropTypes.object
  };