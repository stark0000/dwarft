import React from 'react';
import TreeBranch from './TreeBranch'

const TreeBar = ({uot, utp}) => {
    if (uot) {
        return (
            <div className="tree">
    <TreeBranch branch={uot} url="/uof" utp={utp}/>
            </div>
        )
    } else {
        return (<div>none</div>)
    }
}
export default TreeBar;