import React, { Component } from 'react';
import { UniverseService } from '../../services'
import Property from './Property'
import addb from '../../ressources/add.png';
import edit from '../../ressources/edit.png';
import remove from '../../ressources/remove.png';
class Universe extends Component {

    constructor(props) {
        super(props);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);
        this.editUniverseProp = this.editUniverseProp.bind(this);
        this.deleteUniverseProp = this.deleteUniverseProp.bind(this);
        this.handleChangeKey = this.handleChangeKey.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.state = { universe: {}, newProp: { name: "", data: "" } }
    }

    componentDidMount() {
        this.refreshUniverse()
    }

    refreshUniverse() {
        const { universeId } = this.props.params
        UniverseService.getUniverse(universeId).then((universe) => this.setState({ universe }))
    }

    editUniverseProp(name, data) {
        console.log("edit")
        console.log(name + " " + data)
        var un = this.state.universe;
        un[name] = data;
        this.setState({ universe: un });
    }
    deleteUniverseProp(name) {
        console.log("delete")
    }
    addUniverseProp() {
        console.log("add")
        console.log(JSON.stringify(this.state))
        var un = this.state.universe;
        var np = this.state.newProp;
        un[np.name] = np.data;
        this.setState({ universe: un });
    }

    /*Object.defineProperty(o, "a", {value : 37,
                               writable : true,
                               enumerable : true,
                               configurable : true});
    */

    /*

 {Object.keys(this.state.universe).map(key =>
                    <Property
                        name={key}
                        data={this.state.universe[key]}
                        onRemove={this.deleteUniverseProp}
                        onEdit={this.editUniverseProp}
                        />)}

                        */

    handleChangeName(e) {
        var np = this.state.newProp;
        np.name = e.target.value;
        this.setState({ newProp: np });
    }
    handleChangeData(e) {
        var np = this.state.newProp;
        np.data = e.target.value;
        this.setState({ newProp: np });
    }
    handleChangeKey(e) {
        console.log(e.target.name)
        var k = e.target.name
        var un = this.state.universe
        var v = un[k]
        delete un[k]
        un[e.target.value] = v
        this.setState({ universe: un })
    }
    handleChangeValue(e) {
        console.log(e.target.name)
        var k = e.target.name
        var un = this.state.universe
        un[k] = e.target.value
        this.setState({ universe: un })
    }

    render() {
        const { universeId } = this.props.params
        const { universe: { name } } = this.state

        const items = [{ "name": "nom", "data": "rien" }, { "name": "pouet", "data": "xd" }]
        const {universe} = this.state.universe
        var uniprops = []
        var uniobjs = []
        console.log(JSON.stringify(this.state.universe))
        for (var key in this.state.universe) {
            if (typeof this.state.universe[key] === "object") {
                uniobjs[key] = this.state.universe[key]
            } else {
                uniprops[key] = this.state.universe[key]
            }
        }
        console.log("arrays")
        console.log(JSON.stringify(uniobjs))
        console.log(JSON.stringify(uniprops))
        return (
            <div>
                <h3>Universe {name}</h3>
                {JSON.stringify(this.state)}<br />


                <ul>
                    {Object.keys(this.state.universe).map(key =>
                        <li key={key}>
                            <input name={key} defaultValue={key} onChange={this.handleChangeKey} /*{(key==='name')?"readonly": }*/ /> =&nbsp;
                        <input name={key} defaultValue={this.state.universe[key]} onChange={this.handleChangeValue} />

                            <button onClick={() => this.editUniverseProp(key, this.state.universe[key])}>
                                <img width="15px" src={edit} alt="edit"></img>
                            </button>
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
