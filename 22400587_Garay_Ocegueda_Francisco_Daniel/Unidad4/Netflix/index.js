// ==========================================
// API REST DE NETFLIX
// ==========================================

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");


const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hola Mundo");
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

module.exports = app;

// ==========================================
// CREAR APLICACIÓN
// ==========================================




// ==========================================
// MIDDLEWARES
// ==========================================

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));


// ==========================================
// ESQUEMA DE NETFLIX
// ==========================================

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


// ==========================================
// MODELO NETFLIX
// ==========================================

const Netflix = mongoose.model("Netflix", netflixSchema);


// ==========================================
// CONEXIÓN A MONGODB
// ==========================================

// Para Vercel debes agregar la variable
// MONGODB_URI en las variables de entorno.
//
// Ejemplo:
//
// MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/netflix

const MONGODB_URI = process.env.MONGODB_URI;


// ==========================================
// CONECTAR A MONGODB
// ==========================================

if (MONGODB_URI) {

    mongoose.connect(MONGODB_URI)

        .then(() => {

            console.log("Conectado correctamente a MongoDB");

        })

        .catch((error) => {

            console.error(
                "Error al conectar a MongoDB:",
                error.message
            );

        });

} else {

    console.log(
        "ADVERTENCIA: No se encontró la variable MONGODB_URI"
    );

}


// ==========================================
// RUTA PRINCIPAL
// ==========================================

app.get("/", (req, res) => {

    res.json({

        mensaje: "API de Netflix funcionando correctamente",

        rutas: {

            obtenerTodas:
                "GET /netflix",

            obtenerUna:
                "GET /netflix/:id",

            crear:
                "POST /netflix",

            actualizar:
                "PUT /netflix/:id",

            eliminar:
                "DELETE /netflix/:id"

        }

    });

});


// ==========================================
// GET
// OBTENER TODAS LAS PELÍCULAS
// ==========================================

app.get("/netflix", async (req, res) => {

    try {

        const peliculas = await Netflix.find();

        res.status(200).json(peliculas);

    } catch (error) {

        res.status(500).json({

            mensaje: "Error al obtener las películas",

            error: error.message

        });

    }

});


// ==========================================
// GET
// OBTENER UNA PELÍCULA POR ID
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


        res.status(200).json(pelicula);


    } catch (error) {

        res.status(500).json({

            mensaje: "Error al obtener la película",

            error: error.message

        });

    }

});


// ==========================================
// POST
// CREAR UNA NUEVA PELÍCULA
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


        // ==========================================
        // VALIDAR CAMPOS
        // ==========================================

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


        // ==========================================
        // CREAR PELÍCULA
        // ==========================================

        const nuevaPelicula = new Netflix({

            titulo,

            genero,

            año,

            duracion,

            idioma,

            calificacion,

            nc

        });


        // ==========================================
        // GUARDAR PELÍCULA
        // ==========================================

        const peliculaGuardada =
            await nuevaPelicula.save();


        // ==========================================
        // RESPUESTA
        // ==========================================

        res.status(201).json(

            peliculaGuardada

        );


    } catch (error) {

        res.status(500).json({

            mensaje: "Error al crear la película",

            error: error.message

        });

    }

});


// ==========================================
// PUT
// ACTUALIZAR UNA PELÍCULA
// ==========================================

app.put("/netflix/:id", async (req, res) => {

    try {

        const id = req.params.id;


        const peliculaActualizada =

            await Netflix.findByIdAndUpdate(

                id,

                req.body,

                {

                    new: true,

                    runValidators: true

                }

            );


        // ==========================================
        // VERIFICAR SI EXISTE
        // ==========================================

        if (!peliculaActualizada) {

            return res.status(404).json({

                error: "Película no encontrada"

            });

        }


        // ==========================================
        // RESPUESTA
        // ==========================================

        res.status(200).json(

            peliculaActualizada

        );


    } catch (error) {

        res.status(500).json({

            mensaje:
                "Error al actualizar la película",

            error: error.message

        });

    }

});


// ==========================================
// DELETE
// ELIMINAR UNA PELÍCULA
// ==========================================

app.delete("/netflix/:id", async (req, res) => {

    try {

        const id = req.params.id;


        // ==========================================
        // BUSCAR Y ELIMINAR
        // ==========================================

        const peliculaEliminada =

            await Netflix.findByIdAndDelete(id);


        // ==========================================
        // VERIFICAR SI EXISTE
        // ==========================================

        if (!peliculaEliminada) {

            return res.status(404).json({

                error: "Película no encontrada"

            });

        }


        // ==========================================
        // RESPUESTA
        // ==========================================

        res.status(200).json({

            mensaje:
                "Película eliminada correctamente",

            pelicula:
                peliculaEliminada

        });


    } catch (error) {

        res.status(500).json({

            mensaje:
                "Error al eliminar la película",

            error: error.message

        });

    }

});


// ==========================================
// SERVIDOR LOCAL
// ==========================================

const PORT = process.env.PORT || 3000;


// ==========================================
// INICIAR SERVIDOR
// ==========================================

// Esta parte permite ejecutar el proyecto
// con "node index.js" en tu computadora.
//
// En Vercel se exporta la aplicación
// automáticamente.

if (require.main === module) {

    app.listen(PORT, () => {

        console.log(
            `Servidor ejecutándose en http://localhost:${PORT}`
        );

    });

}


// ==========================================
// EXPORTAR PARA VERCEL
// ==========================================

module.exports = app;