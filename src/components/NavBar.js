import { Button, Nav } from 'react-bootstrap/';
import React from 'react';
import './NavBar.css';

export default class NavBar extends React.Component{

    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <Nav variant="pills" defaultActiveKey={this.props.activeKey} style={{margin:5}}>
                <Nav.Item>
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/tracks">Tracks</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/other">
                    Artists
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/genres">
                    Genres
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/aboutyou">
                    About You
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/searchuser">
                    Search User
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        );
    }
}
