/* esquema de netflix
*/
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
    

const netflixSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },

    genero: {
        type: String,
        required: true
    },

    año: {
        type: Number,
        required: true
    },

    duracion: {
        type: Number,
        required: true
    },

    idioma: {
        type: String,
        required: true
    },

    calificacion: {
        type: Number,
        required: true
    },

    nc: {
        type: String,
        required: true
    }
});

const Netflix = mongoose.model("Netflix", netflixSchema);

module.exports = Netflix;

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();

const PORT = 3000;


// ==========================================
// IMPORTAR MODELO NETFLIX
// ==========================================

const Netflix = require("./models/Netflix");


// ==========================================
// MIDDLEWARES
// ==========================================

// Permite recibir datos JSON
app.use(express.json());

// Muestra las peticiones en la consola
app.use(morgan("dev"));


// ==========================================
// CONEXIÓN A MONGODB
// ==========================================

mongoose.connect("mongodb://127.0.0.1:27017/netflix")
    .then(() => {
        console.log("Conectado a MongoDB");
    })
    .catch((error) => {
        console.error("Error al conectar a MongoDB:", error);
    });


// ==========================================
// RUTA PRINCIPAL
// ==========================================

app.get("/", (req, res) => {
    res.json({
        mensaje: "API de Netflix funcionando correctamente"
    });
});


// ==========================================
// GET - OBTENER TODAS LAS PELÍCULAS
// ==========================================

app.get("/netflix", async (req, res) => {

    try {

        const peliculas = await Netflix.find();

        res.json(peliculas);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener las películas",
            error: error.message
        });

    }

});


// ==========================================
// GET - OBTENER UNA PELÍCULA POR ID
// ==========================================

app.get("/netflix/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const pelicula = await Netflix.findById(id);

        if (!pelicula) {

            return res.status(404).json({
                error: "Película no encontrada"
            });

        }

        res.json(pelicula);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener la película",
            error: error.message
        });

    }

});


// ==========================================
// POST - CREAR UNA NUEVA PELÍCULA
// ==========================================

app.post("/netflix", async (req, res) => {

    try {

        const {
            titulo,
            genero,
            año,
            duracion,
            idioma,
            calificacion,
            nc
        } = req.body;


        // Validar que todos los campos existan

        if (
            !titulo ||
            !genero ||
            !año ||
            !duracion ||
            !idioma ||
            calificacion === undefined ||
            !nc
        ) {

            return res.status(400).json({
                error: "Faltan datos de la película"
            });

        }


        // Crear nueva película

        const nuevaPelicula = new Netflix({

            titulo,
            genero,
            año,
            duracion,
            idioma,
            calificacion,
            nc

        });


        // Guardar en MongoDB

        const peliculaGuardada = await nuevaPelicula.save();


        // Responder

        res.status(201).json(peliculaGuardada);


    } catch (error) {

        res.status(500).json({

            mensaje: "Error al crear la película",

            error: error.message

        });

    }

});


// ==========================================
// PUT - ACTUALIZAR UNA PELÍCULA
// ==========================================

app.put("/netflix/:id", async (req, res) => {

    try {

        const id = req.params.id;


        const {
            titulo,
            genero,
            año,
            duracion,
            idioma,
            calificacion,
            nc
        } = req.body;


        // Buscar y actualizar

        const peliculaActualizada = await Netflix.findByIdAndUpdate(

            id,

            {
                titulo,
                genero,
                año,
                duracion,
                idioma,
                calificacion,
                nc
            },

            {
                new: true
            }

        );


        // Verificar si existe

        if (!peliculaActualizada) {

            return res.status(404).json({

                error: "Película no encontrada"

            });

        }


        // Mostrar película actualizada

        res.json(peliculaActualizada);


    } catch (error) {

        res.status(500).json({

            mensaje: "Error al actualizar la película",

            error: error.message

        });

    }

});


// ==========================================
// DELETE - ELIMINAR UNA PELÍCULA
// ==========================================

app.delete("/netflix/:id", async (req, res) => {

    try {

        const id = req.params.id;


        // Buscar y eliminar

        const peliculaEliminada = await Netflix.findByIdAndDelete(id);


        // Verificar si existe

        if (!peliculaEliminada) {

            return res.status(404).json({

                error: "Película no encontrada"

            });

        }


        // Respuesta

        res.json({

            mensaje: "Película eliminada correctamente",

            pelicula: peliculaEliminada

        });


    } catch (error) {

        res.status(500).json({

            mensaje: "Error al eliminar la película",

            error: error.message

        });

    }

});


// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.listen(PORT, () => {

    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);

});