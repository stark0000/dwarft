import React, { Component } from 'react';
import { ObjectsService } from '../../services'
//import { Link } from 'react-router'

import remove from '../../ressources/remove.png';
import addb from '../../ressources/add.png';

import Nav from './Nav'
import Children from './Children';
import AddField from './AddField';
class Uof extends Component {

    constructor(props) {
        super(props);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);

        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleChangeKey = this.handleChangeKey.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);

        this.deleteuofProp = this.deleteuofProp.bind(this);

        this.state = { uof: {}, uot: {}, uoc: [], utp: "", newProp: { name: "", data: "", type: "prop" } }
    }

    componentDidMount() {
        this.refreshUof()
    }
    componentWillUpdate() {
        //console.log("update " + this.props.router.location.pathname + " - " + this.state.utp)
        //console.log(JSON.stringify(this.props.router))
        if (this.props.router.location.pathname) {
            if (this.props.router.location.pathname !== this.state.utp) {
                //console.log("updating")
                this.refreshUof()
            }
        }
    }

    refreshUof() {
        const { objmap } = this.props.params
        const { splat } = this.props.params
        console.log("objmap " + objmap)
        console.log("splat " + splat)

        var utp = this.props.router.location.pathname
        this.setState({ utp })

        ObjectsService.getObjects(objmap).then((uot) => {
            this.setState({ uot })
            var uof = ObjectsService.getObject(splat, uot)
            var uoc = []
            if (uof.children) {
                for (var i = 0; i < uof.children.length; i++) {
                    uoc[i] = uof.children[i]
                }
            }
            //var uoc = uof.children
            this.setState({ uoc })
            delete uof.children
            this.setState({ uof })
        })
    }

    //delete property
    deleteuofProp(key) {
        var un = this.state.uof;
        delete un[key]
        this.setState({ uof: un });

    }
    //add new property
    adduofProp() {
        var un = this.state.uof;
        var np = this.state.newProp;
        if (np.type === "prop") {
            un[np.name] = np.data;
            this.setState({ uof: un });
        } else if (np.type === "child") {
            var uoc = this.state.uoc
            uoc.push({ name: np.name, children: [] })
            this.setState({ uoc: uoc })
        } else {
            console.log("undef type in : add property")
        }
    }

    //new property type edit
    handleChangeType(e) {
        var np = this.state.newProp;
        np.type = e.target.value;
        this.setState({ newProp: np });
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
        var un = this.state.uof
        var v = un[k]
        delete un[k]
        un[e.target.value] = v
        this.setState({ uof: un })
    }
    //existing property value edit
    handleChangeValue(e) {
        console.log(e.target.name)
        var k = e.target.name
        var un = this.state.uof
        un[k] = e.target.value
        this.setState({ uof: un })
    }

    makeLinks(utp) {
        var parts = utp.split("/")
        var partindexer = []
        var link = ""
        for (var part in parts) {
            if (parts[part]) {
                link = link + "/" + parts[part]
                partindexer[part - 1] = [parts[part], link]
            }
        }
        return partindexer
    }

    uofLink(e) {
        console.log(JSON.stringify(e))
    }

    render() {
        //const { uof: { name } } = this.state

        const utp = this.props.router.location.pathname
        //if(this.state.utp!==utp) this.refreshUof();
        const links = this.makeLinks(utp)
        var {uof} = this.state
        var name = uof.name
        return (
            <div>
                <Nav links={links} />

                <h3>uof {name}</h3>

                {JSON.stringify(this.state)}<br />
                {JSON.stringify(uof)}

                <h4>properties</h4>
                <div id="propertiesList">
                    <ul>
                        {Object.keys(uof).map(key =>
                            <li key={key}>
                                <input name={key} value={key} onChange={this.handleChangeKey} />
                                &nbsp;=&nbsp;
                            <input name={key} value={uof[key]} onChange={this.handleChangeValue} />

                                <button onClick={() => this.deleteuofProp(key)}>
                                    <img width="15px" height="15px" src={remove} alt="remove"></img>
                                </button>
                            </li>
                        )}
                    </ul>
                </div>

                <h4>Children</h4>
                <div id="childrenList">
                    <ul>
                        {Object.keys(this.state.uoc).map(child =>
                            <Children
                                key={child}
                                name={this.state.uoc[child].name}
                                utp={utp}
                                deleteuofProp={this.deleteuofProp}
                                />
                        )}
                    </ul>
                </div>


                <h4>add property</h4>
                <div id="addPropField">
                    property type&nbsp;
                    <select name="type" onChange={this.handleChangeType}>
                        <option value="prop">prop</option>
                        <option value="text">text</option>
                        <option value="pic">pic</option>
                        <option value="child">child</option>
                    </select>

                    <AddField
                        tof={this.state.newProp.type}
                        handleChangeName={this.handleChangeName}
                        handleChangeData={this.handleChangeData}
                        adduofProp={this.handleChangeData}
                        />
                    <button onClick={() => this.adduofProp()}>commit
                        <img width="15px" height="15px" src={addb} alt="add"></img>
                    </button>
                </div>

            </div>
        )
    }
}
export default Uof;
