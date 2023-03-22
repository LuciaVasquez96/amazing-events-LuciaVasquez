const apiUrl = 'https://mindhub-xj03.onrender.com/api/amazing';
const contenedorCard = document.getElementById('contenedorCard');
const checkCategory = document.getElementById('checkCategory');
const searcher = document.getElementById('searcher');

const filterEvents = (category, searchText, events) => {
  return events.filter((event) => {
    const matchesCategory = category.length === 0 || category.includes(event.category);
    const matchesSearch = searchText.length === 0 || event.name.toLowerCase().includes(searchText.toLowerCase()) || event.description.toLowerCase().includes(searchText.toLowerCase());
    const eventDate = new Date(event.date);
    const currentDate = new Date();
    const isFutureEvent = eventDate >= currentDate;
    return matchesCategory && matchesSearch && isFutureEvent;
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
  const filteredEvents = filterEvents(selectedCategories, searchText, events);
  showEvents(filteredEvents);
};

const createCategoriesHtml = (events) => {
  let categoriesHtml = '';
  const categories = ['Food', 'Museum', 'Concert', 'Race', 'Books', 'Cinema', 'Party'];
  categories.forEach((category) => {
    const categoryEvents = events.filter((event) => event.category === category);
    if (categoryEvents.length > 0) {
      categoriesHtml += `<div class="form-check form-check-inline">
                          <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
                          <label class="form-check-label" for="${category}">${category}</label>
                         </div>`;
    }
  });
  checkCategory.innerHTML = categoriesHtml;
};

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const futureEvents = data.events.filter((event) => new Date(event.date) >= new Date());
    createCategoriesHtml(futureEvents);
    showEvents(futureEvents);
    checkCategory.addEventListener('change', () => {
      updateEvents(futureEvents);
    });
    searcher.addEventListener('input', () => {
      updateEvents(futureEvents);
    });
  })
  .catch(error => console.error(error));
