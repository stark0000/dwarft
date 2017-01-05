import React, { Component } from 'react';
import { Link } from 'react-router'

class NavBar extends Component {
    
    componentDidMount() {
        this.setNavBar()
    }

    setNavBar() {
        //const utp = this.props.location.pathname
        console.log(JSON.stringify(this.props))
    }
    render() {
        return (
            <div className="NavBar">
            
                <Link to={`/uof/jambon/du/terroir`}>
                jambon/du/terroir
                </Link>
                  &nbsp;| xd | lol | ptdr
                  <br/>

            </div>
        );
    }
}

export default NavBar;
