import React, { Component } from 'react';

const MoveField = ({uot, movetoo}) => {

    console.log(JSON.stringify(uot))
    if(uot.children){
    return (
        <div>
            {uot.name}<br/>
            {(uot.children).map((child) =>{
                <li>{child.name}</li>
            })}
        </div>
    )
    } else {
        return(<div>empty</div>)
    }
}
export default MoveField;