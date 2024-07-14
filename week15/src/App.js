import React from 'react';
import './App.css';
import House from './House';
import NewHouseForm from './NewHouseForm';
import DeleteHouseButton from './DeleteHouseButton';

const HOUSES_ENDPOINT = 'https://ancient-taiga-31359.herokuapp.com/api/houses';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: []
    };
  }

  componentDidMount() {
    fetch(HOUSES_ENDPOINT)
      .then(res => res.json())
      .then(data => {
        this.setState({
          houses: data
        });
      })
      .catch(error => {
        console.error('Error fetching houses:', error);
      });
  }

  deleteRoom(e, house, room){
    const index = house.rooms.indexOf(room);
    house.rooms.splice(index, 1);
    this.updateHouse(house)
    .then(() =>{
    this.setState(state => {
      for(let h of state.houses) {
        if(h._id === house._id) {
          let h = house;
          break;
        }      
      }
      return state;
    })
   })
   e.preventDefault();
  }


  addNewRoom = (e, house, room) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    // Create a new house object with the updated rooms array
    const updatedHouse = {
      ...house,
      rooms: [...house.rooms, room]
    };
  
    // Update the house on the server
    this.updateHouse(updatedHouse)
      .then(() => {
        // Update state after successful API call
        this.setState(prevState => ({
          houses: prevState.houses.map(h => (h._id === house._id ? updatedHouse : h))
        }));
      })
      .catch(error => {
        console.error('Error updating house:', error);
        // Handle error gracefully, e.g., show error message to user
      });
  };
  

  deleteHouse = (houseId) => {
    fetch(`${HOUSES_ENDPOINT}/${houseId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('House deleted successfully:', data);
        this.setState(prevState => ({
          houses: prevState.houses.filter(house => house._id !== houseId)
        }));
      })
      .catch(error => {
        console.error('Error deleting house:', error);
      });
  };

  updateHouse = (house) => {
    return fetch(`${HOUSES_ENDPOINT}/${house._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(house)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('House updated successfully:', data);
        return data; // Return updated house data
      });
  };

  render() {
    const { houses } = this.state;

    return (
      <div>
        <h1>Add New House</h1>
        <NewHouseForm />

        {houses.map(house => (
          <div key={house._id}>
            <House
              data={house}
              addNewRoom={(e, room) => this.addNewRoom(e, house, room)}
              deleteRoom={(e, room) => this.deleteRoom(e, house, room)}
            />
            <DeleteHouseButton houseId={house._id} onDelete={() => this.deleteHouse(house._id)} />
          </div>
        ))}
      </div>
    );
  }
}
