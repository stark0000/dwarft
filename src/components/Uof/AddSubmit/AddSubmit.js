import React from 'react';
import addb from '../../../ressources/add.png';
const AddSubmit = ({valid, adduofProp}) => {

    if (valid) {
        return (
            <button onClick={() => adduofProp()}>commit
            <img width="15px" height="15px" src={addb} alt="add"></img>
            </button>
        )
    } else {
        return (
            <button disabled><span style={{color:'red'}}>unallowed name</span>
            </button>
        )

    }
}
export default AddSubmit;