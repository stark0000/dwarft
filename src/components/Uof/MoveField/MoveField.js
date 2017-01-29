import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep'

class MoveField extends Component {
    constructor(props) {
        super(props)

        this.mt = this.mt.bind(this);
        this.mp = this.mp.bind(this);
        this.state = {
            uot: {},
            uom: {},
            utm: ''
        }
    }
    componentDidMount() {
        this.refreshmoveField()
    }
    componentWillUpdate() {
        this.refreshmoveField()
    }
    refreshmoveField() {

        if (this.state.uot !== this.props.uot) {
            console.log("uot " + JSON.stringify(this.props.uot))
            this.setState({ uot: this.props.uot })
            var uom = cloneDeep(this.props.uot)
            this.setState({ uom })
            this.setState({ utm: this.props.uot.name })
        }
        /*
        else if (this.state.uom !== this.props.uom) {
            console.log("m")
            this.setState({ uom: this.props.uom })
        }
        else if (this.state.uot && !this.state.uom) {
            console.log("mt")
            var uom = cloneDeep(this.state.uot)
            this.setState({ uom })
        }*/

    }
    mp() {
        var mps: String = JSON.stringify(this.state.utm)
        mps = mps.slice(1, -1)
        var na = mps.split('/')
        console.log("na: " + na)
        if (na.length < 1) return false

        var uomt = cloneDeep(this.state.uot)
        for (var i = 1; i < na.length - 1; i++) {
            for (var child in uomt.children) {
                console.log("EE "+JSON.stringify(uomt.children[child].name)+' '+na[i])
                if (uomt.children[child].name === na[i]) {
                    console.log("---")
                    uomt = uomt.children[child]
                    break
                }
            }
        }
        console.log("uomt "+JSON.stringify(uomt))
        mps = mps.substring(0, mps.lastIndexOf('/'))
        this.setState({ utm: mps })
        this.setState({ uom: uomt })

    }
    mt(child) {
        this.setState({ uom: child })
        this.setState({ utm: this.state.utm + "/" + child.name })
    }
    inituom(uot) {
        var uom = cloneDeep(uot)
        console.log("uom " + JSON.stringify(uom))
        this.setState({ uom })
        this.setState({ utm: uot.name })
    }

    render() {
        console.log("uoms " + JSON.stringify(this.state.uot))
        //if (this.state.uot && !this.state.uom) this.inituom(this.state.uot)

        return (
            <div>
                {
                    this.state.uom ?

                        <div>
                            <button onClick={() => this.mp()}>&lt;-</button>&nbsp;
                            {this.state.utm}&nbsp;
                            <button onClick={()=>this.props.moveUofTo(this.state.utm)}>duplicate</button>
                            <button onClick={()=>this.props.moveUofTo(this.state.utm, true)}>move</button>
                            < br />
                            {this.state.uom.children ?
                                <ul>
                                    {(this.state.uom.children).map((child) => {
                                        return (
                                            <li key={child.name}>
                                                <button onClick={() => this.mt(child)}>
                                                    {child.name}&nbsp;-&gt;
                                                </button>
                                            </li>
                                        )
                                    })}
                                </ul>
                                :
                                <div>x</div>
                            }

                        </div>
                        :
                        <div>empty</div>
                }
            </div>

        )
    }
}
export default MoveField;