import React from 'react';
import { Link } from 'react-router'
import remove from '../../../ressources/remove.png';
const Children = ({name, utp, deleteuofProp }) => {
    return (
                        <li>
                            <Link to={utp + "/" + name}>{name}</Link>
                            <button onClick={() => this.deleteuofProp(name)}>
                                <img width="15px" height="15px" src={remove} alt="remove"></img>
                            </button>
                        </li>
    )
}
export default Children;