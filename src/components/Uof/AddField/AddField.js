import React from 'react';
import { AddProp, AddChild, AddPic } from './AddTypedField'

const AddField = ({tof, newProp, handleChangeNPname, handleChangeNPdata}) => {
    if (tof === "prop") {
        return (
            <AddProp
                newProp={newProp}
                handleChangeNPname={handleChangeNPname}
                handleChangeNPdata={handleChangeNPdata}
                />
        )
    } else if (tof === "child") {
        return (
            <AddChild
                newProp={newProp}
                handleChangeNPname={handleChangeNPname}
                />
        )
    } else if (tof === "pic") {
        return (
            <AddPic
                newProp={newProp}
                />
        )
    } else {
        return (<div>empty</div>)
    }
}
export default AddField;