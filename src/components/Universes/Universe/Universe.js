import React, { Component } from 'react';
import edit from '../../../ressources/edit.png';
import remove from '../../../ressources/remove.png';
import { Link } from 'react-router'
const Universe = ({ id, name, onRemove }) => {
    return (
        <ul>
            <li key={id}>
                {name}
                <Link to={`/universe/${id}`}>
                    <img width="15px" src={edit} alt="edit"></img>
                </Link>
                <button onClick={() => onRemove(id)}>
                    <img width="15px" src={remove} alt="remove"></img>
                </button>

            </li>
        </ul>
    )
}
export default Universe;