import React, { Component } from "react";

const HOUSES_ENDPOINT = 'https://ancient-taiga-31359.herokuapp.com/api/houses';

export default class NewHouseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    };

    addNewHouse = () => {
        fetch(HOUSES_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            this.setState({ name: '' });
            window.location.reload(); // Reset input field to empty string and reload page
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle errors here
        });
    };

    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Enter house name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                />
                <br />
                <button onClick={this.addNewHouse}>Add House</button>
            </div>
        );
    }
}


