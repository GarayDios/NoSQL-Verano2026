const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dns = require('dns');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
]);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(
  'mongodb+srv://grupo:grupo@servidorprueba.ygegryf.mongodb.net/netflix'
)
.then(() => {
  console.log('Conectado correctamente a MongoDB');
})
.catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});

// Ruta principal para comprobar que la API funciona
app.get('/', (req, res) => {
    res.send('API de Netflix funcionando correctamente');
});

// Colección películas
const peliculaSchema = new mongoose.Schema(
  {},
  {
    strict: false,
    collection: 'peliculas'
  }
);

const Pelicula =
  mongoose.models.Pelicula ||
  mongoose.model('Pelicula', peliculaSchema);

// Colección series
const serieSchema = new mongoose.Schema(
  {},
  {
    strict: false,
    collection: 'series'
  }
);

const Serie =
  mongoose.models.Serie ||
  mongoose.model('Serie', serieSchema);

// Obtener todas las películas
app.get('/peliculas', async (req, res) => {
  try {
    const peliculas = await Pelicula.find();

    return res.json(peliculas);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al obtener las películas',
      error: error.message
    });
  }
});

// Obtener una película por ID
app.get('/peliculas/:id', async (req, res) => {
  try {
    const pelicula = await Pelicula.findById(req.params.id);

    if (!pelicula) {
      return res.status(404).json({
        mensaje: 'Película no encontrada'
      });
    }

    return res.json(pelicula);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al obtener la película',
      error: error.message
    });
  }
});

// Obtener todas las series
app.get('/series', async (req, res) => {
  try {
    const series = await Serie.find();

    return res.json(series);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al obtener las series',
      error: error.message
    });
  }
});

// Obtener una serie por ID
app.get('/series/:id', async (req, res) => {
  try {
    const serie = await Serie.findById(req.params.id);

    if (!serie) {
      return res.status(404).json({
        mensaje: 'Serie no encontrada'
      });
    }

    return res.json(serie);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al obtener la serie',
      error: error.message
    });
  }
});

// Solo inicia el puerto cuando lo ejecutas localmente.
// En Vercel se exporta la aplicación.
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
  });
}

module.exports = app;