const mainContainer = document.querySelector("#container")

const applicationState = {
    requests: []
}



const API = "http://localhost:8088"

// the fetchRequest function is getting the requests which is the array of requests objects from database.json API,
// a fetch call returns a promise that you resolve with .then(), a .then() recieves a function with a parameter of response 
// response is the data array of request objects, that you parse with json() that converts the data into javascript format.
// this reponse is also a promise which you have to resolve again with .then(), the serviceRequests response data is a parameter
// you are now accessing the initially empty array from the application state object and storing the value of serviceRequests inside requests
export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}


// this function gets a copy of the request objects in the requests array by mapping through it and using the spread operator 
export const getRequests = () => {
    return applicationState.requests.map( (request) => ({...request}))
}

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}




export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}