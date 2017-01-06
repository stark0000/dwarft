import React from 'react';
const AddField = ({tof, handleChangeName, handleChangeData, adduofProp}) => {
    if(tof==="prop"){
    return (
        <div>
            property name:&nbsp;
            <input name="name" value="" onChange={handleChangeName} />
            <br/>
            propoerty value:&nbsp;
            <input name="data" value="" onChange={handleChangeData} />
        </div>
    )
    } else if (tof==="child"){
        return (<div>
            child name:&nbsp;
            <input name="name" value="" onChange={handleChangeName} />
        </div>)
    } else {
        return (<div>empty</div>)
    }
}
export default AddField;