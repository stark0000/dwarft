import React, { Component } from 'react';
import edit from '../../ressources/edit.png';
import remove from '../../ressources/remove.png';

class Json extends Component {


    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { universe: "null", items: [], itemPrint: [], texte: '' };
    }

//const truc = (event) => { delete(monId) }
    componentDidMount() {
        var that = this;
        var url = 'http://localhost:3001/universes'

        fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                console.log(data.id);
                return data;
            })
            .then(function (data) {
                that.setState({ items: data });
            });
    }


    handleChange(e) {
        this.setState({ texte: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        var newItem = {
            text: this.state.text,
            id: Date.now()
        };
        this.setState((prevState) => ({
            items: prevState.items.concat(newItem),
            text: ''
        }));
    }

    printobject(o) {
        var stringified = "";
        for (const key of Object.keys(o)) {
            stringified += key + ": " + o[key];
        }
        return stringified;
    }

    deleteItem(event) {
        console.log("xd");
        console.log(event);
        var element = event.target;
        console.log(element);
        var item_id = element.getAttribute("id");
        console.log(item_id);
        fetch(`http://localhost:3001/universes/${item_id}`, {
            method: 'DELETE'
        })
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            });
            
        var that = this;
        var url = 'http://localhost:3001/universes'

        fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                console.log(data.id);
                return data;
            })
            .then(function (data) {
                that.setState({ items: data });
            });

            
            //this.state.items.map(item => <Item id="item.id" />)(
                /*render() {
  const delete = (event) => this.props.deleteItem(this.props.id)
  <a onClick={this.deleteItem} item_id={
item.id
} href="javascript:void(0);">
}
*/
    }

    render() {
        return (
            <div className="Json">
                {this.state.universe}<br />x<br />
                <br />
                <ul>
                    {this.state.items.map(item => (
                        <li key={item.id}>

                            {JSON.stringify(item)}|&nbsp;

                        <a href="#">
                                <img width="15px" src={edit} alt="edit"></img>
                            </a> |&nbsp;

                        <a onClick={this.deleteItem} item_id={item.id} href="javascript:void(0);">
                                <img id={item.id} width="15px" src={remove} alt="remove"></img>
                            </a>


                        </li>
                    ))}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} value={this.state.texte} />
                    <button>{'Add universe #' + (this.state.items.length + 1)}</button>
                </form>
            </div>
        );
    }

}

export default Json;
