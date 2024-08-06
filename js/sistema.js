class Pelicula {
    constructor(titulo, genero, anio) {
        this.titulo = titulo;
        this.genero = genero;
        this.anio = anio;
    }
}

let peliculas = JSON.parse(localStorage.getItem('peliculas')) || [
    new Pelicula("Matrix", "Ciencia ficcion", 1999),
    new Pelicula("Inception", "Ciencia ficcion", 2010),
    new Pelicula("Forrest Gump", "Drama", 1994),
    new Pelicula("Gladiador", "Accion", 2000),
    new Pelicula("Superbad", "Comedia", 2007),
    new Pelicula("La Máscara", "Comedia", 1994),
    new Pelicula("El Caballero Oscuro", "Accion", 2008),
    new Pelicula("Tiempos Violentos", "Crimen", 1994),
    new Pelicula("Sueños de Libertad", "Drama", 1994),
    new Pelicula("El Padrino", "Crimen", 1972)
];

function agregarPelicula() {
    let titulo = document.getElementById('titulo').value;
    let genero = document.getElementById('genero').value;
    let anio = document.getElementById('anio').value;

    if (!titulo || !genero || !anio) {
        Toastify({
            text: "Por favor, complete todos los datos.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            style: {
                background: "#ff4b5c",
            },
            stopOnFocus: true
        }).showToast();
    } else if (!isNaN(anio) && Number.isInteger(parseFloat(anio))) {
        anio = parseInt(anio);
        let nuevaPelicula = { titulo, genero, anio };
        peliculas.push(nuevaPelicula);
        guardarPeliculas();
        renderPeliculas();

        Toastify({
            text: "Película agregada con éxito!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            stopOnFocus: true
        }).showToast();

        const modal = bootstrap.Modal.getInstance(document.getElementById('agregarModal'));
        modal.hide();

        document.getElementById('titulo').value = '';
        document.getElementById('genero').value = '';
        document.getElementById('anio').value = '';
    } else {
        Toastify({
            text: "Por favor, ingresa datos válidos (solo números enteros para el año).",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            style: {
                background: "#ff4b5c",
            },
            stopOnFocus: true
        }).showToast();
    }
}

function guardarPeliculas() {
    localStorage.setItem('peliculas', JSON.stringify(peliculas));
}

const moviesContainer = document.getElementById('movies-container');

function renderPeliculas(filtradas = peliculas) {
    moviesContainer.innerHTML = '';
    filtradas.forEach((pelicula, index) => {
        const card = document.createElement('div');
        card.className = 'col';
        card.innerHTML = `
            <div class="card mb-4 rounded-3 shadow-sm">
                <div class="card-header py-3">
                    <h4 class="my-0 fw-normal">${pelicula.genero}</h4>
                </div>
                <div class="card-body">
                    <h1 class="card-title pricing-card-title">${pelicula.titulo}</h1>
                    <ul class="list-unstyled mt-3 mb-4">
                        <li>Año: ${pelicula.anio}</li>
                    </ul>
                    <button type="button" class="w-100 btn btn-lg btn-danger" onclick="eliminarPelicula(${index})">Eliminar Película</button>
                </div>
            </div>
        `;
        moviesContainer.appendChild(card);
    });
}

function buscarPelicula(event) {
    event.preventDefault();
    let titulo = document.getElementById('tituloBuscar').value;
    let peliculasEncontradas = peliculas.filter(pelicula => pelicula.titulo.toLowerCase().includes(titulo.toLowerCase()));

    peliculasEncontradas.length > 0
    ? renderPeliculas(peliculasEncontradas)
    : Toastify({
        text: "No se encontraron películas con ese título.",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
            background: "#ff4b5c",
        },
        stopOnFocus: true
    }).showToast();
}

function eliminarPelicula(index) {
    peliculas.splice(index, 1);
    localStorage.setItem('peliculas', JSON.stringify(peliculas));

    Toastify({
        text: "Película eliminada con éxito!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        },
        stopOnFocus: true
    }).showToast();
    
    renderPeliculas();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('guardarPeliculaBtn').addEventListener('click', agregarPelicula);
});

renderPeliculas();

