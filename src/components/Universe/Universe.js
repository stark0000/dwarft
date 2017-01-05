import React, { Component } from 'react';
import { UniverseService } from '../../services'
import addb from '../../ressources/add.png';
import remove from '../../ressources/remove.png';
class Universe extends Component {

    constructor(props) {
        super(props);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);

        this.handleChangeKey = this.handleChangeKey.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);

        this.deleteUniverseProp = this.deleteUniverseProp.bind(this);

        this.state = { universe: {}, newProp: { name: "", data: "" } }
    }

    componentDidMount() {
        this.refreshUniverse()
    }

    refreshUniverse() {
        const { universeId } = this.props.params
        UniverseService.getUniverse(universeId).then((universe) => this.setState({ universe }))
    }

    //delete property
    deleteUniverseProp(key) {
        var un = this.state.universe;
        delete un[key]
        this.setState({ universe: un });
        
    }
    //add new property
    addUniverseProp() {
        var un = this.state.universe;
        var np = this.state.newProp;
        un[np.name] = np.data;
        this.setState({ universe: un });
    }

    //new property key name edit
    handleChangeName(e) {
        var np = this.state.newProp;
        np.name = e.target.value;
        this.setState({ newProp: np });
    }
    //new property value edit
    handleChangeData(e) {
        var np = this.state.newProp;
        np.data = e.target.value;
        this.setState({ newProp: np });
    }
    //existing property key name edit
    handleChangeKey(e) {
        console.log(e.target.name)
        var k = e.target.name
        var un = this.state.universe
        var v = un[k]
        delete un[k]
        un[e.target.value] = v
        this.setState({ universe: un })
    }
    //existing property value edit
    handleChangeValue(e) {
        console.log(e.target.name)
        var k = e.target.name
        var un = this.state.universe
        un[k] = e.target.value
        this.setState({ universe: un })
    }

    render() {
        const { universe: { name } } = this.state

        console.log(JSON.stringify(this.state.universe))
        return (
            <div>
                <h3>Universe {name}</h3>
                {JSON.stringify(this.state)}<br />
                <ul>
                    {Object.keys(this.state.universe).map(key =>
                        <li key={key}>
                            <input name={key} defaultValue={key} onChange={this.handleChangeKey} /*{(key==='name')?"readonly": }*/ /> =&nbsp;
                        <input name={key} defaultValue={this.state.universe[key]} onChange={this.handleChangeValue} />

                            <button onClick={() => this.deleteUniverseProp(key)}>
                                <img width="15px" height="15px" src={remove} alt="remove"></img>
                            </button>
                        </li>
                    )}
                </ul>
                <input name="name" onChange={this.handleChangeName} /> =&nbsp;
                <input name="data" onChange={this.handleChangeData} />
                <button onClick={() => this.addUniverseProp()}>
                    <img width="15px" height="15px" src={addb} alt="add"></img>
                </button>
            </div>
        )
    }
}
export default Universe;
