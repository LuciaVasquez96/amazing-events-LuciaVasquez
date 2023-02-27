const contenedorCard = document.getElementById('contenedorCard')
const currentDate = infoEventos.currentDate


function tarjetas(info) {

    let tarjeta = ""

    for (const evento of info) {
        if (evento.date >= currentDate) {

            tarjeta += `<div class="card shadow" style = "width: 22rem;">
                <img src=${evento.image} class="card-img-top" alt="#">
                    <div class="card-body">
                        <h5 class="card-title">${evento.name}</h5>
                        <p class="card-text mb-4">${evento.description}</p>
                        <p>Price $ ${evento.price}
                            <a href="./details.html" class="btn btn-primary ms-4">See more</a>
                        </p>
                    </div>
                </div>`
        }
    }
    return tarjeta
}

let cards = tarjetas(infoEventos.events)
contenedorCard.innerHTML = cards

