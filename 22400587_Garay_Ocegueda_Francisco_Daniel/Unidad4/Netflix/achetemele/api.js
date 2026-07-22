const API_URL = "https://servidorpelis.vercel.app";

// ==========================================
// OBTENER PELÍCULAS
// ==========================================

async function obtenerPeliculas() {

    const respuesta = await fetch(
        `${API_URL}/peliculas`
    );

    if (!respuesta.ok) {

        throw new Error(
            `Error HTTP ${respuesta.status}: Error al consultar las películas`
        );

    }

    return await respuesta.json();
}


// ==========================================
// AGREGAR PELÍCULA
// ==========================================

async function agregarPelicula(pelicula) {

    const respuesta = await fetch(
        `${API_URL}/peliculas`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(pelicula)
        }
    );

    if (!respuesta.ok) {

        throw new Error(
            `Error HTTP ${respuesta.status}: Error al guardar la película`
        );

    }

    return await respuesta.json();
}