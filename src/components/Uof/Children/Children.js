import React from 'react';
import { Link } from 'react-router'
import remove from '../../../ressources/remove.png';
import edit from '../../../ressources/edit.png';
const Children = ({name, utp, deleteuofChild, handleChangeValueChild }) => {
    return (
        <li>
            <input name={name} value={name} onChange={handleChangeValueChild} />
            <Link to={utp + "/" + name}>
                <button>
                    <img width="15px" height="15px" src={edit} alt="edit">
                    </img>
                </button>
            </Link>
            <button onClick={() => deleteuofChild(name)}>
                <img width="15px" height="15px" src={remove} alt="remove"></img>
            </button>
        </li>
    )
}
export default Children;