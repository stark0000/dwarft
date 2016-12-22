import React, { Component } from 'react';
import Universe from './Universe';
import { UniverseService } from '../../services'
class Universes extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.removeUniverse = this.removeUniverse.bind(this)
        this.state = { items: [], text: '' }
    }

    componentDidMount() {
        this.refreshUniverses()
    }

    refreshUniverses() {
        UniverseService.getUniverses().then((universes) => this.setState({ items: universes }))
    }

    handleSubmit(e) {
        e.preventDefault();
        UniverseService.postUniverse(e.target.name.value).then(() => this.refreshUniverses())
        e.target.reset()
    }

    removeUniverse(id) {
        UniverseService.deleteUniverse(id).then(() => this.refreshUniverses())
    }

    render() {
        const { items } = this.state
        return (
            <div>
                <h3>Universes list</h3>
                { items.map(item => 
                    <Universe 
                        key={item.id} 
                        id={item.id} 
                        name={item.name}
                        onRemove={this.removeUniverse} 
                    />) }
                <form onSubmit={this.handleSubmit}>
                    <input name="name" defaultValue={this.state.name} />
                    <button>{'Add universe #' + (this.state.items.length + 1)}</button>
                </form>
            </div>
        )
    }
}
export default Universes;
