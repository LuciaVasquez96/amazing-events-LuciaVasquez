const apiUrl = 'https://mindhub-xj03.onrender.com/api/amazing';
const contenedorCard = document.getElementById('contenedorCard');
const checkCategory = document.getElementById('checkCategory');
const searcher = document.getElementById('searcher');


const filterEvents = (category, searchText, events) => {
  return events.filter((event) => {
    const matchesCategory = category.length === 0 || category.includes(event.category);
    const matchesSearch = searchText.length === 0 || event.name.toLowerCase().includes(searchText.toLowerCase()) || event.description.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });
};

const showEvents = (events) => {
  const noResults = `<div class="mt-5">
                       <p class="d-flex flex-column">
                       <img src="./assets/imagenes/GIF.gif" alt="No results found" class="mb-4">
                       Sorry no results found, please try another search.</p>
                     </div>`;

  if (events.length === 0) {
    contenedorCard.innerHTML = noResults;
    return;
  }

  let eventsHtml = '';
  events.forEach((event) => {
    eventsHtml += `<div class="card shadow" style="width: 22rem;">
                    <img src="${event.image}" class="card-img-top" alt="#">
                    <div class="card-body">
                       <h5 class="card-title">${event.name}</h5>
                       <p class="card-text mb-4">${event.description}</p>
                       <p>Price $ ${event.price}<a href="./details.html?id=${event._id}" class="btn btn-primary ms-4">See more</a></p>
                    </div>
                    </div>`;
  });

  contenedorCard.innerHTML = eventsHtml;
};

const updateEvents = (events) => {
  const selectedCategories = Array.from(checkCategory.querySelectorAll(':checked')).map((input) => input.value);
  const searchText = searcher.value.toLowerCase();
  const filteredEvents = filterEvents(selectedCategories, searchText, events.filter((event) => new Date(event.date) < new Date()));
  showEvents(filteredEvents);
};

const createCategoriesHtml = (events) => {
  let categoriesHtml = '';
  [...new Set(events.map((event) => event.category))].forEach((category) => {
    categoriesHtml += `<div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
                        <label class="form-check-label" for="${category}">${category}</label>
                       </div>`;
  });
  checkCategory.innerHTML = categoriesHtml;
};

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    createCategoriesHtml(data.events);
    showEvents(data.events.filter((event) => new Date(event.date) < new Date()));
    checkCategory.addEventListener('change', () => {
      updateEvents(data.events);
    });
    searcher.addEventListener('input', () => {
      updateEvents(data.events);
    });
  })
  .catch(error => console.error(error));
