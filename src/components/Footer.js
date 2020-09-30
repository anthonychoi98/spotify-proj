import React from 'react';

class Footer extends React.Component{
    constructor(props){
        super(props);
  
    }

    render(){
        return(
            <div className="footer" style={{display: 'flex', backgroundColor: "white", maxHeight:'15vh', width: '100%'}}>
                <p>
                    Copyright © 2020 Anthony Choi. All Rights Reserved
                </p>
            </div>
        ); 
    }
}

export default Footer;