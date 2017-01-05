import React from 'react';
import edit from '../../../ressources/edit.png';
import remove from '../../../ressources/remove.png';
import { Link } from 'react-router'
const Nav = ({ utp }) => {
    return (
        <div>
        {utp.map( (link) => (<Link to={link[1]}> > {link[0]}</Link>))}
        </div>
    )
}
export default Nav;