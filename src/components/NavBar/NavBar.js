import React from 'react';
import { Link } from 'react-router'

const NavBar = () => {
    return (
        <div className="NavBar">

            <Link to={`/uof/jambon/du/terroir`}>
                jambon/du/terroir
                </Link>
            &nbsp;| xd | lol | ptdr
                  <br />
        </div>
    );
}

export default NavBar;
