import React, { Component } from 'react';
import edit from '../../../ressources/edit.png';
import remove from '../../../ressources/remove.png';
class LiItem extends Component {
    render() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <li key={item.id}>

                        {item.text}|&nbsp;

                        <a href="#">
                            <img width="15px" src={edit} alt="edit"></img>
                        </a> |&nbsp;

                        <a href={item.id}>
                            <img width="15px" src={remove} alt="remove"></img>
                        </a>

                    </li>
                ))}
            </ul>
        );
    }
}
export default LiItem;