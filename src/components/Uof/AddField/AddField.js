import React from 'react';
import { AddProp, AddChild } from './AddTypedField'

const AddField = ({tof, newProp, handleChangeName, handleChangeData}) => {
    if (tof === "prop") {
        return (
            <AddProp
                newProp={newProp}
                handleChangeName={handleChangeName}
                handleChangeData={handleChangeData}
                />
        )
    } else if (tof === "child") {
        return (
            <AddChild
                newProp={newProp}
                handleChangeName={handleChangeName}
                />
        )
    } else {
        return (<div>empty</div>)
    }
}
export default AddField;