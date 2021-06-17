import { getRequests, deleteRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})


export const Requests = () => {
    const requests = getRequests()

    let html = '<ul>'

    const listItems = requests.map(request => {
        return `<li>
            ${request.description}
            <button class="request__delete" id="request--${request.id}">Delete</button>
        </li>`
    })

    html += listItems.join("")
    html += '</ul>'                

    return html
}