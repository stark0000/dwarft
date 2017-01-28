import React from 'react';
import { Link } from 'react-router'

const TreeBranch = ({branch, url, utp}) => {
    var subbranch = branch.children

    var ur = url + "/" + branch.name
    var sutp: String = JSON.stringify(utp)
    var sur: String = JSON.stringify(ur)
    sutp = sutp.slice(1, -1)
    sur = sur.slice(1, -1)
    var isinpath = sutp.includes(sur)

    if (subbranch) {
        return (
            <ul key={ur} className="tree">

                <li>
                    <Link to={ur}>
                        {
                            isinpath ?
                                <span className="uotpath">{branch.name}</span>
                                :
                                <span className="notuotpath">{branch.name}</span>
                        }
                    </Link>
                    <ul>
                        {subbranch.map((child) => {
                            return (

                                <li key={ur + "/likey/" + child.name}>
                                    <TreeBranch
                                        key={ur + "/tbkey/" + child.name}
                                        branch={child}
                                        url={ur}
                                        utp={utp}
                                        />
                                </li>)
                        })}
                    </ul>
                </li>
            </ul>
        )
    }
    else {
        return (<ul>
            <Link to={ur}>
                {
                    isinpath ?
                        <span className="uotpath">{branch.name}</span>
                        :
                        <span className="notuotpath">{branch.name}</span>
                }
            </Link>
        </ul>)
    }
}
export default TreeBranch;