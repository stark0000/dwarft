import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { ObjectsService } from '../../services'
//import { Link } from 'react-router'


import Nav from './Nav'
import Children from './Children';
import AddField from './AddField';
import AddSubmit from './AddSubmit';
import Props from './Props';
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


        this.state = { uof: {}, uoc: [], utp: "", newProp: { name: "", data: "", type: "prop", valid:false } }
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
            var uof = ObjectsService.getObject(splat, uot)
            var uoc = []
            if (uof.children) {
                uof.children.forEach((child)=>{
                    uoc.push({name:child.name})
                })
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
    //delete child
    deleteuofChild(key) {
        var un = this.state.uoc;
        for (var i = 0; i < un.length; i++) {
            if(un[i].name===key){
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
        this.setState({uoc:un})

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
        np.name=""
        np.data=""
        np.valid=false
        this.setState({newProp:np})
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
        np.valid=this.isValidNew(e.target.value)
        np.name = e.target.value;
        this.setState({ newProp: np });
    }
    isValidNew(val){

        for(var n in this.state.uof){
            if(n===val) return false
        }
        
        //FOREACH possile mais les return de partout j'aime bien
        /*
        var isValid=true
        Object.keys(this.state.uof).forEach((prop)=>{
            if(prop===val) isValid=false
        })
        if(!isValid) return false
        */
        for(var c in this.state.uoc){
            if(this.state.uoc[c].name===val) return false
        }

        if(val==="children") return false
        if(val==="") return false

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
    //child name edit
    handleChangeValueChild(e) {
        console.log(e.target.name)
        var un = this.state.uoc
        un.forEach((child)=>{
            if(child.name===e.target.name){
                child.name=e.target.value
            }
        })
        this.setState({ uoc: un })
    }

    makeLinks(utp) {
        var parts = utp.split("/")
        var partindexer = []
        var link = ""
        parts.forEach((part)=>{
            if(part){// for undefined?
                link=link+"/"+part
                partindexer.push([part, link])
            }
        })
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

                    <h3>uof {name}</h3>

                    {JSON.stringify(this.state)}<br />

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
            )
        }
    }
}
export default Uof;
