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
import MoveField from './MoveField';
class Uof extends Component {

    constructor(props) {
        super(props);
        this.handleChangeEPname = this.handleChangeEPname.bind(this);
        this.handleChangeEPdata = this.handleChangeEPdata.bind(this);
        this.handleChangeECname = this.handleChangeECname.bind(this);

        this.handleChangeNPtype = this.handleChangeNPtype.bind(this);
        this.handleChangeNPname = this.handleChangeNPname.bind(this);
        this.handleChangeNPdata = this.handleChangeNPdata.bind(this);


        this.adduofProp = this.adduofProp.bind(this);
        this.deleteuofProp = this.deleteuofProp.bind(this);
        this.deleteuofChild = this.deleteuofChild.bind(this);

        this.shbar = this.shbar.bind(this);
        this.moveUofTo = this.moveUofTo.bind(this);

        this.state = {
            uot: {}, //universe object tree (full)
            uof: {}, //universe object file (uot branch being seen)
            uoc: [], //uof children array
            utp: "", //universe tree path path of uof in uot
            newProp: { name: "", data: "", type: "prop", valid: false },
            showsidebar: "sbhide"

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
            var uof = ObjectsService.getObject(splat, universe)
            var uot = universe
            this.setState({ uot })
            this.setState({ uof })
            var uoc = []
            if (uof.children) {
                uoc = uof.children
            }
            this.setState({ uoc })
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

        delete unt[key]

        this.setState({ uof: unt })
        this.patchUof()

    }
    //delete child
    deleteuofChild(key) {
        var un = this.state.uoc;
        for (var i = 0; i < un.length; i++) {
            if (un[i].name === key) {
                un.splice(i, 1)
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

        var np = this.state.newProp;
        if (np.type === "prop") {

            unt[np.name] = np.data;
            this.setState({ uof: unt });
            this.patchUof()

        } else if (np.type === "child") {
            var un = this.state.uof
            var uoc = this.state.uoc
            if (!uoc) uoc = []
            uoc.push({ name: np.name, children: [] })
            un.children = uoc
            console.log(JSON.stringify(uoc))
            this.setState({ uoc: uoc })
            this.setState({ uof: un }) //required?
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
    handleChangeNPtype(e) {
        var np = this.state.newProp;
        np.type = e.target.value;
        this.setState({ newProp: np });
    }
    //new property key name edit
    handleChangeNPname(e) {
        var np = this.state.newProp;
        np.valid = this.isValidNew(e.target.value)
        np.name = e.target.value;
        this.setState({ newProp: np });
    }
    isValidNew(val) {

        for (var n in this.state.uof) {
            if (n === val) return false
        }
        for (var c in this.state.uoc) {
            if (this.state.uoc[c].name === val) return false
        }

        if (val === "children") return false
        if (val === "") return false

        return true
    }
    //new property value edit
    handleChangeNPdata(e) {
        var np = this.state.newProp;
        np.data = e.target.value;
        this.setState({ newProp: np });
    }
    //existing property key name edit
    handleChangeEPname(e) {
        console.log(e.target.name)
        var k = e.target.name

        var unt = this.state.uof

        var vt = unt[k]
        delete unt[k]
        unt[e.target.value] = vt

        this.setState({ uof: unt })
        this.patchUof()

    }
    //existing property value edit
    handleChangeEPdata(e) {
        console.log(e.target.name)
        var k = e.target.name
        var unt = this.state.uof
        unt[k] = e.target.value
        this.setState({ uof: unt })
        this.patchUof()
    }
    //child name edit
    handleChangeECname(e) {
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
    shbar() {
        var showsidebar = (this.state.showsidebar === "sbhide" ? "sbshow" : "sbhide")
        console.log(showsidebar)
        this.setState({ showsidebar })
    }

    moveUofTo(ur, andremove = false) {
        //console.log(ur)
        var to = this.state.uot
        var sur: String = ur
        sur = sur.substring(sur.indexOf('/') + 1)
        var to = ObjectsService.getObject(sur, to)
        if (!to) return false
        if (!to.children) to.children = []
        to.children.push(this.state.uof)
        //console.log("to " + JSON.stringify(this.state.uot))

        if (andremove) {
            var sutp: String = this.props.params.splat
            sutp = sutp.substring(0, sutp.lastIndexOf('/'))
            console.log("sutp " + sutp)
            to = this.state.uot
            to = ObjectsService.getObject(sutp, to)
            if (!to) return false

            for (var i = 0; i < to.children.length; i++) {
                if (to.children[i].name === this.state.uof.name) {
                    to.children.splice(i, 1)
                    break;
                }
            }

        }

        this.patchUof()
    }

    render() {
        //const { uof: { name } } = this.state

        const utp = this.props.router.location.pathname
        //if(this.state.utp!==utp) this.refreshUof();
        const links = this.makeLinks(utp)
        var {uof} = this.state
        var name = uof.name
        //console.log("uot: "+JSON.stringify(uot))


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
                        <span style={{ color: 'red' }}>uof </span>
                        {JSON.stringify(this.state.uof)}<br /><br />
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
                                handleChangeEPname={this.handleChangeEPname}
                                handleChangeEPdata={this.handleChangeEPdata}
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
                                                handleChangeECname={this.handleChangeECname}
                                                />
                                        )}
                                    </ul>
                                    :
                                    <ul>none</ul>
                            }
                        </div>

                        <h4>move uof to</h4>
                        <div>
                            <MoveField
                                uot={this.state.uot}
                                moveUofTo={this.moveUofTo}
                                />
                        </div>
                        <h4>add property</h4>
                        <div id="addPropField">
                            property type&nbsp;
                    <select name="type" onChange={this.handleChangeNPtype}>
                                <option value="prop">prop</option>
                                <option value="text">text</option>
                                <option value="pic">pic</option>
                                <option value="child">child</option>
                            </select>

                            <AddField
                                tof={this.state.newProp.type}
                                newProp={this.state.newProp}
                                handleChangeNPname={this.handleChangeNPname}
                                handleChangeNPdata={this.handleChangeNPdata}
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
