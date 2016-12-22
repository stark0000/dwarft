import React, { Component } from 'react';
import { UniverseService } from '../../services'
class Universe extends Component { 
    
    constructor(props) {
        super(props);
        this.state = { universe: {} }
    }

    componentDidMount() {
        this.refreshUniverse()
    }

    refreshUniverse() {
        const { universeId } = this.props.params
        UniverseService.getUniverse(universeId).then((universe) => this.setState({universe}))
    }

    render() {
        const { universeId } = this.props.params
        const { universe: { name } } = this.state
        return (
            <div>
                <h3>Universe {name}</h3>
            </div>
        )
    }
}
export default Universe;
