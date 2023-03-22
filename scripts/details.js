const apiUrl = "https://mindhub-xj03.onrender.com/api/amazing";
const queryString = location.search;
const parametros = new URLSearchParams(queryString);
const idExtraidoUrl = parametros.get("id");

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const eventoD = data.events.find(event => event._id == idExtraidoUrl);
    const contenedorCards = document.getElementById("divDetails");

    contenedorCards.innerHTML = `<div class="container details" id="divDetails">
      <div class="row justify-content-center ">
        <div class="col-6 w-auto">
          <div class="card mt-5 mb-5" style="width: 23rem; height: auto;">
            <img src="${eventoD.image}" class="card-img img-details" alt="#">
          </div>
        </div>
        <div class="col-6 w-auto">
          <div class="card text-center mt-5 mb-5" style="width: 30rem; height: 23rem;">
            <div class="card-body p-5">
              <h5 class="card-title">${eventoD.name}</h5>
              <p class="text-justify">${eventoD.description}</p>
              <p class="d-flex align-items-center">Date: ${eventoD.date}</p>
              <p class="d-flex align-items-center">Place: ${eventoD.place}</p>
              <p class="d-flex align-items-center">Capacity: ${eventoD.capacity}</p>
              <p class="d-flex align-items-center">Price: $ ${eventoD.price}
                <a href="./index.html?id=${eventoD.id}" class="btn btn-primary ms-4" id="verMas">
                  Back to the start
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  })
  .catch(error => console.log(error));
