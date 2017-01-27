import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { ObjectsService } from '../../services'

import './uof.css';
//import { Link } from 'react-router'


import Nav from './Nav'
import Children from './Children';
import AddField from './AddField';
import AddSubmit from './AddSubmit';
import Props from './Props';
import TreeBar from './TreeBar';
//import MoveField from './MoveField';
class Uof extends Component {

    constructor(props) {
        super(props);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);

        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleChangeKey = this.handleChangeKey.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);

        this.handleChangeValueChild = this.handleChangeValueChild.bind(this);

        this.adduofProp = this.adduofProp.bind(this);
        this.deleteuofProp = this.deleteuofProp.bind(this);
        this.deleteuofChild = this.deleteuofChild.bind(this);

        this.shbar = this.shbar.bind(this);
        this.movetoo = this.movetoo.bind(this);

        this.state = {
            uot: {},
            uofp: {},
            uof: {},
            uocp: {},
            uoc: [],
            utp: "",
            newProp: { name: "", data: "", type: "prop", valid: false },
            showsidebar: "sbhide",
            movetoo: {}

        }
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
        //console.log("objmap " + objmap)
        //console.log("splat " + splat)

        var utp = this.props.router.location.pathname
        this.setState({ utp })
        ObjectsService.getObjects(objmap).then((universe) => {
            var uofp = ObjectsService.getObject(splat, universe)
            var uot = universe
            this.setState({ uot })
                console.log(JSON.stringify(this.state.movetoo))
            if(JSON.stringify(this.state.movetoo)==={}){
                console.log(JSON.stringify("d "+this.state.movetoo))
                var movetoo = uot
                this.setState({movetoo})
            }
            this.setState({ uofp })
            var uof = JSON.parse(JSON.stringify(uofp))
            var uoc = []
            if (uof.children) {
                var uocp = uofp.children
                this.setState({ uocp })

                uof.children.forEach((child) => {
                    uoc.push({ name: child.name })
                })
            }
            //var uoc = uof.children
            uoc = uocp
            this.setState({ uoc })
            delete uof.children
            this.setState({ uof })
        })
    }

    patchUof() {
        const { objmap } = this.props.params
        ObjectsService.patchObject(this.state.uot, objmap).then((response) => {
            this.refreshUof()
        })
    }

    //delete property
    deleteuofProp(key) {

        var unt = this.state.uof;
        var un = this.state.uofp;

        delete unt[key]
        delete un[key]

        this.setState({ uof: unt })
        this.setState({ uofp: un })
        this.patchUof()

    }
    //delete child
    deleteuofChild(key) {
        var un = this.state.uoc;
        for (var i = 0; i < un.length; i++) {
            if (un[i].name === key) {
                delete un[i]
                break;
            }
        }
        /*
        un.forEach((child) => {
            if(child.name===key){
                delete un[child]
            }
        })
        */
        this.setState({ uoc: un })
        this.patchUof()

    }
    //add new property
    adduofProp() {

        var unt = this.state.uof;
        var un = this.state.uofp;

        var np = this.state.newProp;
        if (np.type === "prop") {

            unt[np.name] = np.data;
            this.setState({ uof: unt });
            un[np.name] = np.data;
            this.setState({ uofp: un });
            this.patchUof()

        } else if (np.type === "child") {
            var uoc = this.state.uoc
            uoc.push({ name: np.name, children: [] })
            this.setState({ uoc: uoc })
            this.patchUof()
        } else {
            console.log("undef type in : add property")
        }
        np.name = ""
        np.data = ""
        np.valid = false
        this.setState({ newProp: np })
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
        np.valid = this.isValidNew(e.target.value)
        np.name = e.target.value;
        this.setState({ newProp: np });
    }
    isValidNew(val) {

        for (var n in this.state.uof) {
            if (n === val) return false
        }

        //FOREACH possile mais les return de partout j'aime bien
        /*
        var isValid=true
        Object.keys(this.state.uof).forEach((prop)=>{
            if(prop===val) isValid=false
        })
        if(!isValid) return false
        */
        for (var c in this.state.uoc) {
            if (this.state.uoc[c].name === val) return false
        }

        if (val === "children") return false
        if (val === "") return false

        return true
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

        var un = this.state.uofp
        var unt = this.state.uof

        var v = un[k]
        delete un[k]
        un[e.target.value] = v

        var vt = unt[k]
        delete unt[k]
        unt[e.target.value] = vt

        this.setState({ uof: unt })
        this.setState({ uofp: un })
        this.patchUof()

    }
    //existing property value edit
    handleChangeValue(e) {
        console.log(e.target.name)
        var k = e.target.name

        var un = this.state.uofp
        var unt = this.state.uof

        un[k] = e.target.value
        unt[k] = e.target.value

        this.setState({ uof: unt })
        this.setState({ uofp: un })
        this.patchUof()
    }
    //child name edit
    handleChangeValueChild(e) {
        console.log(e.target.name)

        var un = this.state.uoc

        un.forEach((child) => {
            if (child.name === e.target.name) {
                child.name = e.target.value
            }
        })
        this.setState({ uoc: un })
        this.patchUof()
    }

    makeLinks(utp) {
        var parts = utp.split("/")
        var partindexer = []
        var link = ""
        parts.forEach((part) => {
            if (part) {// for undefined?
                link = link + "/" + part
                partindexer.push([part, link])
            }
        })
        return partindexer
    }

    uofLink(e) {
        console.log(JSON.stringify(e))
    }
    shbar() {
        var showsidebar = (this.state.showsidebar === "sbhide" ? "sbshow" : "sbhide")
        console.log(showsidebar)
        this.setState({ showsidebar })
    }

    movetoo(cname) {
        var movetoo = this.state.movetoo
        var mtchild = {}
        if (movetoo.children) {
            movetoo.children.forEach((child) => {
                if (child.name === cname) {
                    mtchild = child
                }
            })
        }
        movetoo = mtchild
        this.setState({ movetoo })
    }

    render() {
        //const { uof: { name } } = this.state

        const utp = this.props.router.location.pathname
        //if(this.state.utp!==utp) this.refreshUof();
        const links = this.makeLinks(utp)
        var {uof} = this.state
        var name = uof.name
        //console.log("uot: "+JSON.stringify(uot))
        var {movetoo} = this.state


        if (!uof) {
            return (
                <div>
                    <button onClick={browserHistory.goBack}>Back</button>
                    <br />
                    <a href="/">index</a>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Nav links={links} />

                    <div id="treeBar" className={this.state.showsidebar}>
                        <button id="shbar" onClick={this.shbar}>x</button>
                        <TreeBar
                            uot={this.state.uot}
                            utp={utp}
                            />
                    </div>
                    <div id="browser" className="browser">
                        <h3>uof {name}</h3>

                        <span style={{ color: 'red' }}>uot </span>
                        {JSON.stringify(this.state.uot)}<br /><br />
                        <span style={{ color: 'red' }}>uofp </span>
                        {JSON.stringify(this.state.uofp)}<br /><br />
                        <span style={{ color: 'red' }}>uof </span>
                        {JSON.stringify(this.state.uof)}<br /><br />
                        <span style={{ color: 'red' }}>uocp </span>
                        {JSON.stringify(this.state.uocp)}<br /><br />
                        <span style={{ color: 'red' }}>uoc </span>
                        {JSON.stringify(this.state.uoc)}<br /><br />
                        <span style={{ color: 'red' }}>utp </span>
                        {JSON.stringify(this.state.utp)}<br /><br />
                        <span style={{ color: 'red' }}>newprop </span>
                        {JSON.stringify(this.state.newProp)}<br /><br />

                        <h4>properties</h4>
                        <div id="propertiesList">
                            <Props
                                uof={uof}
                                handleChangeKey={this.handleChangeKey}
                                handleChangeValue={this.handleChangeValue}
                                deleteuofProp={this.deleteuofProp}
                                />
                        </div>

                        <h4>Children</h4>
                        <div id="childrenList">
                            {
                                this.state.uoc ?
                                    <ul>
                                        {Object.keys(this.state.uoc).map(child =>
                                            <Children
                                                key={child}
                                                name={this.state.uoc[child].name}
                                                utp={utp}
                                                deleteuofChild={this.deleteuofChild}
                                                handleChangeValueChild={this.handleChangeValueChild}
                                                />
                                        )}
                                    </ul>
                                    :
                                    <ul>none</ul>
                            }
                        </div>

                        <h4>move uof to</h4>
                        <div>
                            {movetoo.name}<br />
                            {JSON.stringify(movetoo)}
                            {movetoo.children ?
                                <div>
                                    {
                                        Object.keys(movetoo.children).map((child) => {
                                            <li>{child.name}</li>
                                        })
                                    }</div>
                                : <div>empty</div>
                            }
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
                                newProp={this.state.newProp}
                                handleChangeName={this.handleChangeName}
                                handleChangeData={this.handleChangeData}
                                />

                            <AddSubmit
                                valid={this.state.newProp.valid}
                                adduofProp={this.adduofProp}
                                />
                        </div>
                    </div>
                </div>
            )
        }
    }
}
export default Uof;
