// ==========================================
// CARGAR PELÍCULAS AL INICIAR LA PÁGINA
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    cargarPeliculas();

});


// ==========================================
// MOSTRAR PELÍCULAS
// ==========================================

async function cargarPeliculas() {

    const lista = document.getElementById("listaPeliculas");

    try {

        // Mostrar mensaje de carga

        lista.innerHTML = `
            <p style="color:white;">
                 Cargando películas...
            </p>
        `;


        // Consultar API

        const peliculas = await obtenerPeliculas();

        console.log("Películas recibidas:", peliculas);


        // Limpiar lista

        lista.innerHTML = "";


        // Si no hay películas

        if (!peliculas || peliculas.length === 0) {

            lista.innerHTML = `
                <p style="color:white;">
                    No hay películas disponibles.
                </p>
            `;

            return;
        }


        // Crear tarjeta por cada película

        peliculas.forEach(pelicula => {

            const tarjeta = document.createElement("li");

            tarjeta.className = "movie-card";


            // Usar portada si existe

            const portada = pelicula.portada
                ? pelicula.portada
                : "https://via.placeholder.com/300x450?text=Sin+Portada";


            tarjeta.innerHTML = `

                <img
                    class="movie-image"
                    src="${portada}"
                    alt="${pelicula.titulo}"
                    onerror="this.src='https://via.placeholder.com/300x450?text=Sin+Portada'"
                >


                <div class="movie-info">

                    <div class="movie-title">

                        ${pelicula.titulo || "Sin título"}

                    </div>


                    <div class="movie-details">

                        <span>
                            ${pelicula.genero || "Sin género"}
                        </span>

                        <span>
                            ${pelicula.año || "N/A"}
                        </span>

                    </div>


                    <div class="rating">

                         ${pelicula.calificacion || "N/A"}

                    </div>

                </div>

            `;


            // Agregar tarjeta a la página

            lista.appendChild(tarjeta);

        });


    } catch (error) {

        console.error(
            "Error al cargar las películas:",
            error
        );


        lista.innerHTML = `

            <div style="
                color:white;
                background:#250000;
                padding:20px;
                border-radius:10px;
                grid-column:1/-1;
            ">

                <h3>
                    Error al cargar las películas
                </h3>

                <p>
                    ${error.message}
                </p>

            </div>

        `;

    }

}


// ==========================================
// AGREGAR PELÍCULA
// ==========================================

document
    .getElementById("formulario")
    .addEventListener("submit", async (evento) => {

        // Evitar recargar la página

        evento.preventDefault();


        // Crear objeto película

        const pelicula = {

            titulo: document
                .getElementById("titulo")
                .value,

            genero: document
                .getElementById("genero")
                .value,

            año: Number(
                document
                    .getElementById("año")
                    .value
            ),

            duracion: Number(
                document
                    .getElementById("duracion")
                    .value
            ),

            idioma: document
                .getElementById("idioma")
                .value,

            calificacion: Number(
                document
                    .getElementById("calificacion")
                    .value
            )

        };


        try {

            // Enviar película a la API

            await agregarPelicula(pelicula);


            // Mostrar mensaje

            alert(
                " ¡Película agregada correctamente!"
            );


            // Limpiar formulario

            document
                .getElementById("formulario")
                .reset();


            // Volver a cargar películas

            cargarPeliculas();


        } catch (error) {

            console.error(error);

            alert(
                " Error al agregar la película"
            );

        }

    });