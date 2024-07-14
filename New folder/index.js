const ENDPOINT = 'https://ancient-taiga-31359.herokuapp.com/api/houses';


fetch(ENDPOINT)  //Get or Read Request
.then(res => res.json())
.then(res => {
    res.forEach(house => console.log(house.name + '<br>'));
})
fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'  
    },
    body: JSON.stringify({
        name: 'Fetch House'
    })
})
//Post or Create Request

fetch('${ENDPOINT}/id', {
    method:'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }, 
})
//Delete Request

fetch('${ENDPOINT}/id', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'Fetch House',
        rooms: [
            {name: 'Front Room', area: 200},
            {name: 'Back Room', area: 200},
            {name: 'Kitchen', area: 170},
        ]
    })
})
//Update or Post Request
