const apiUrl = "https://mindhub-xj03.onrender.com/api/amazing";


function filtrarCategorias(infoArr) {       // Categorías(orden y filtrado)

    let arrayCategorias = [];

    infoArr.forEach(event => {
        if (!arrayCategorias.includes(event.category)) {
            arrayCategorias.push(event.category)
        }
    })
    return arrayCategorias.sort();
}
function ordenarPorPorcAttMenor(a, b) {
    if (a.porcentajeAtt < b.porcentajeAtt) { return -1; }
    if (a.porcentajeAtt > b.porcentajeAtt) { return 1; }
    return 0;
}
function ordenarPorPorcAttAlto(a, b) {
    if (a.porcentajeAtt > b.porcentajeAtt) { return -1; }
    if (a.porcentajeAtt < b.porcentajeAtt) { return 1; }
    return 0;
}
function ordenarPorCapacidad(a, b) {
    if (a.capacity > b.capacity) { return -1; }
    if (a.capacity < b.capacity) { return 1; }
    return 0;
}


fetch(apiUrl)
    .then(response => response.json())
    .then(data => {

        const categorias = filtrarCategorias(data.events);
        const eventosPasados = data.events.filter((event) => event.date < data.currentDate);
        const eventosFuturos = data.events.filter((event) => event.date >= data.currentDate);

        eventosPasados.forEach((event) => {        //Porcentaje de asistencia a cada evento(eventos pasados)
            event.porcentajeAtt = parseFloat((event.assistance * 100 / event.capacity).toFixed(2));
        })

        eventosFuturos.forEach((event) => {        //Porcentaje estimado a cada evento(eventos futuros)
            event.porcentajeEstimado = parseFloat((event.estimate * 100 / event.capacity).toFixed(2));
        })

        //Orden de array

        const eventosOrdenAlto = eventosPasados.map((event) => event);          //Mayor a menor
        eventosOrdenAlto.sort(ordenarPorPorcAttAlto);

        const eventosOrdenBajo = eventosPasados.map((event) => event);          //Menor a mayor
        eventosOrdenBajo.sort(ordenarPorPorcAttMenor);

        const eventosOrdenCapacidad = eventosPasados.map((event) => event);      //Por capacidad
        eventosOrdenCapacidad.sort(ordenarPorCapacidad);


        const eventosFuturosCategoria = [];           //Estadísticas por categoria(eventos futuros)
        for (let categoria of categorias) {
            let ingresosTotales = 0;
            let sumaPorcentaje = 0;
            let conteoEventos = 0;
            let objetoEvento = {};
            objetoEvento.category = categoria;
            for (let event of eventosFuturos) {
                if (event.category.toLowerCase() == categoria.toLowerCase()) {
                    ingresosTotales += event.price * event.estimate;
                    sumaPorcentaje += event.porcentajeEstimado;
                    conteoEventos++;
                }
            }
            objetoEvento.ingresosTotales = ingresosTotales;
            if (sumaPorcentaje != 0) {
                objetoEvento.porcentajePromedio = (sumaPorcentaje / conteoEventos).toFixed(2);
            }
            else {
                objetoEvento.porcentajePromedio = 0;
            }
            eventosFuturosCategoria.push(objetoEvento);
        }


        const eventosPasadosCategoria = [];     //Estadísticas por categoría(eventos pasados)
        for (let categoria of categorias) {
            let ingresosTotales = 0;
            let sumaPorcentaje = 0;
            let conteoEventos = 0;
            let objetoEvento = {};
            objetoEvento.category = categoria;
            for (let event of eventosPasados) {
                if (event.category.toLowerCase() == categoria.toLowerCase()) {
                    ingresosTotales += event.price * event.assistance;
                    sumaPorcentaje += event.porcentajeAtt;
                    conteoEventos++;
                }
            }
            objetoEvento.ingresosTotales = ingresosTotales;
            if (sumaPorcentaje != 0) {
                objetoEvento.porcentajePromedio = (sumaPorcentaje / conteoEventos).toFixed(2);
            }
            else {
                objetoEvento.porcentajePromedio = 0;
            }
            eventosPasadosCategoria.push(objetoEvento);
        }
        console.log("eventosPasadosCategoria: ", eventosPasadosCategoria);


        const tHead = `<table class="table-bordered">
                         <thead>
                           <tr>
                            <th colspan="3" class="caption">Events Statistics</th>
                           </tr>
                         </thead>`


        const primertBodyHead = `<tbody class="table-bordered">
                                  <tr class="stats-group">
                                  <th>Events with the highest percentage of attendance</th>
                                  <th>Events with the lowest percentage of attendance</th>
                                  <th>Events with larger capacity</th>
                                  </tr>`


        let topTres = ``;
        const filasRenderizar = 3;

        for (let i = 0; i < filasRenderizar; i++) {
            topTres += `<tr>
                            <td> ${eventosOrdenAlto[i].name}: ${eventosOrdenAlto[i].porcentajeAtt} % </td>
                            <td> ${eventosOrdenBajo[i].name}: ${eventosOrdenBajo[i].porcentajeAtt} % </td>
                            <td> ${eventosOrdenCapacidad[i].name}: ${eventosOrdenCapacidad[i].capacity}  </td>
                          </tr>`
        }

        const segundoBodyHead = `<tr>
                                <th colspan="3" class="events-title">Upcoming events statistics by category</th>
                                 </tr>
                                <tr class="stats-group">
                                <th>Categories</th>
                                <th>Revenues</th>
                                <th>Percentage of attendance</th>
                               </tr>`


        let filasTablaEventosFuturos = ``;
        for (let i = 0; i < eventosFuturosCategoria.length; i++) {
            filasTablaEventosFuturos += `<tr>
                                <td> ${eventosFuturosCategoria[i].category} </td>
                                <td> $ ${eventosFuturosCategoria[i].ingresosTotales}.- </td>
                                <td> ${eventosFuturosCategoria[i].porcentajePromedio} %</td>
                            </tr>`
        }

        const tercerBodyHead = `<tr class="table-bordered">
                                   <th colspan="3" class="events-title">Past events statistics by category</th>
                               </tr>
                                <tr class="stats-group">
                                   <th>Categories</th>
                                   <th>Revenues</th>
                                   <th>Percentage of attendance</th>
                                </tr>`

        let filasTablaEventosAnteriores = ``;
        for (let i = 0; i < eventosPasadosCategoria.length; i++) {
            filasTablaEventosAnteriores += `<tr>
                           <td> ${eventosPasadosCategoria[i].category} </td>
                           <td> $ ${eventosPasadosCategoria[i].ingresosTotales}.- </td>
                           <td> ${eventosPasadosCategoria[i].porcentajePromedio} %</td>
                        </tr>`
        }

        filasTablaEventosAnteriores += `</tbody>
                                        </table>`


        const contenedorTabla = document.getElementById("container-table");    //Contenedor de mi html  
        contenedorTabla.innerHTML = tHead + primertBodyHead + topTres + segundoBodyHead + filasTablaEventosFuturos + tercerBodyHead + filasTablaEventosAnteriores;
    })


    .catch(error => {            //Muestra de mensaje de error
        console.log(`Ha ocurrido un error. Por favor intenta de nuevo mas tarde. Detalles del error: ${error}`);
    })
