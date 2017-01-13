import React from 'react';

const AddProp = ({newProp, handleChangeName, handleChangeData}) => {
    return (
        <div>
            property name:&nbsp;
            <input name="name" value={newProp.name} onChange={handleChangeName} />
            <br />
            propoerty value:&nbsp;
            <input name="data" value={newProp.data} onChange={handleChangeData} />
        </div>
    )
}

const AddChild = ({newProp, handleChangeName}) => {
    return (
        <div>
            child name:&nbsp;
            <input name="name" value={newProp.name} onChange={handleChangeName} />
        </div>
    )
}



/* else if (tof==="child"){
    return (<div>
        child name:&nbsp;
        <input name="name" value={newProp.name} onChange={handleChangeName} />
    </div>)
} else {
    return (<div>empty</div>)
}
}*/
export { AddProp, AddChild }