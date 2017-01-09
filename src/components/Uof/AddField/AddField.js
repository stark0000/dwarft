import React from 'react';
const AddField = ({tof, newProp, handleChangeName, handleChangeData}) => {
    if(tof==="prop"){
    return (
        <div>
            property name:&nbsp;
            <input name="name" value={newProp.name} onChange={handleChangeName} />
            <br/>
            propoerty value:&nbsp;
            <input name="data" value={newProp.data} onChange={handleChangeData} />
        </div>
    )
    } else if (tof==="child"){
        return (<div>
            child name:&nbsp;
            <input name="name" value={newProp.name} onChange={handleChangeName} />
        </div>)
    } else {
        return (<div>empty</div>)
    }
}
export default AddField;