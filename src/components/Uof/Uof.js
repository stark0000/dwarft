import React, { Component } from 'react';
import { ObjectsService } from '../../services'
import addb from '../../ressources/add.png';
import remove from '../../ressources/remove.png';
import Nav from './Nav'
import { Link } from 'react-router'
class Uof extends Component {

    constructor(props) {
        super(props);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);

        this.handleChangeKey = this.handleChangeKey.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);

        this.deleteuofProp = this.deleteuofProp.bind(this);

        this.state = { uof: {}, uot: {}, uoc: [], utp: "", newProp: { name: "", data: "" } }
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
        un[np.name] = np.data;
        this.setState({ uof: un });
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

                <div>
                    {links.map((link) => (<Link to={link[1]} name={link[1]}> > {link[0]}</Link>))}
                </div>

                <h3>uof {name}</h3>
                {JSON.stringify(this.state)}<br />
                {JSON.stringify(uof)}
                <ul>
                    {Object.keys(uof).map(key =>
                        <li key={key}>
                            <input name={key} defaultValue={key} onChange={this.handleChangeKey} />
                            &nbsp;=&nbsp;
                            <input name={key} defaultValue={uof[key]} onChange={this.handleChangeValue} />

                            <button onClick={() => this.deleteuofProp(key)}>
                                <img width="15px" height="15px" src={remove} alt="remove"></img>
                            </button>
                        </li>
                    )}
                </ul>
                <input name="name" onChange={this.handleChangeName} /> =&nbsp;
                <input name="data" onChange={this.handleChangeData} />
                <button onClick={() => this.adduofProp()}>
                    <img width="15px" height="15px" src={addb} alt="add"></img>
                </button>
                <p>Children</p>
                <ul>
                    {Object.keys(this.state.uoc).map(key =>
                        <li key={key}>
                            <Link to={utp + "/" + this.state.uoc[key]['name']}>{this.state.uoc[key]['name']}</Link>
                            <button onClick={() => this.deleteuofProp(key)}>
                                <img width="15px" height="15px" src={remove} alt="remove"></img>
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}
export default Uof;
