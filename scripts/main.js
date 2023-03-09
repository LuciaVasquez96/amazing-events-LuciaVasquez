const contenedorCard = document.getElementById('contenedorCard')

function tarjetas(info) {

    let tarjeta = ""

    for (const evento of info) {


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
    return tarjeta
}

let cards = tarjetas(infoEventos.events)
contenedorCard.innerHTML = cards


const checkboxes = document.querySelectorAll('input[type="checkbox"][name="category"]');
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener('click', function () {
    const selectedCategories = Array.from(checkboxes).filter(function (checkbox) {
      return checkbox.checked;
    }).map(function (checkbox) {
      return checkbox.value;
    });
    const filteredData = data.filter(function (item) {
      return selectedCategories.includes(item.category);
    });
    console.log(filteredData);
  });
});
