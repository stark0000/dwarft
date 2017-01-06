import React from 'react';
import { Link } from 'react-router'
const Nav = ({ links }) => {
    return (
        <div id="navLinks">
            {links.map((link) => (<Link key={link[1]} to={link[1]} name={link[1]}> > {link[0]}</Link>))}
        </div>
    )
}
export default Nav;