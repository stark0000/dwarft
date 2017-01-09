import React from 'react';
import remove from '../../../ressources/remove.png';

const Props = ({uof, handleChangeKey, handleChangeValue, deleteuofProp }) => {
    var propName = uof.name
    var unameuof = JSON.parse(JSON.stringify(uof))
    delete unameuof.name
    return (
        
                    <ul>
                            <li key={"nameField"}>
                                name:&nbsp;{propName}
                            </li>
                            
                        {Object.keys(unameuof).map(key =>
                            <li key={key}>
                                <input name={key} value={key} onChange={handleChangeKey} />
                                &nbsp;=&nbsp;
                            <input name={key} value={unameuof[key]} onChange={handleChangeValue} />

                                <button onClick={() => deleteuofProp(key)}>
                                    <img width="15px" height="15px" src={remove} alt="remove"></img>
                                </button>
                            </li>
                        )}
                    </ul>
    )
}
export default Props;