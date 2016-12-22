import React from 'react';
import edit from '../../../ressources/edit.png';
import remove from '../../../ressources/remove.png';
const Property = ({ name, data, onRemove, onEdit }) => {

    return (
        <ul>
            <li key={name}>
                <input name="name" defaultValue={name} /> =&nbsp;
                <input name="data" defaultValue={data} />

                <button onClick={() => onEdit(name, data)}>
                    <img width="15px" src={edit} alt="edit"></img>
                </button>
                <button onClick={() => onRemove(name)}>
                    <img width="15px" height="15px" src={remove} alt="remove"></img>
                </button>
            </li>
        </ul>
    )

}
export default Property;