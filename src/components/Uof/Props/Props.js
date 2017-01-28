import React from 'react';
import cloneDeep from 'lodash/cloneDeep'
import remove from '../../../ressources/remove.png';

const Props = ({uof, handleChangeEPname, handleChangeEPdata, deleteuofProp }) => {
    var propName = uof.name
    var unameuof = cloneDeep(uof)
    delete unameuof.name
    delete unameuof.children
    return (
        <ul>
            <li key={"nameField"}>
                name:&nbsp;{propName}
            </li>

            {Object.keys(unameuof).map(key =>
                <li key={key}>
                    <input name={key} value={key} onChange={handleChangeEPname} />
                    &nbsp;=&nbsp;
                            <input name={key} value={unameuof[key]} onChange={handleChangeEPdata} />

                    <button onClick={() => deleteuofProp(key)}>
                        <img width="15px" height="15px" src={remove} alt="remove"></img>
                    </button>
                </li>
            )}
        </ul>
    )
}
export default Props;