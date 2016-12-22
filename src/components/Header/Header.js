import React, { Component } from 'react';
import logo from '../../ressources/canard-plastique-invisible.png';

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <a href="/">
                    <img src={logo} className="App-logo" alt="logo" />
                </a>
                <h2>Header</h2>
            </div>
        );
    }
}

export default Header;
