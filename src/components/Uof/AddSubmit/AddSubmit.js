import React from 'react';
import addb from '../../../ressources/add.png';
const AddSubmit = ({valid, adduofProp}) => {


    return (
        <button disabled={!valid} onClick={() => adduofProp()}>
            {
                valid ?
                    <span>
                        commit
                <img width="15px" height="15px" src={addb} alt="add"></img>
                    </span>
                    :
                    <span style={{ color: 'red' }}>unallowed name</span>
            }
        </button>
    )
}
export default AddSubmit;