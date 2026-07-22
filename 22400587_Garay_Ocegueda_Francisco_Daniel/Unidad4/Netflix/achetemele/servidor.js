const express = require("express");
const path = require("path");

const app = express();

const port = process.env.PORT || 3000;


// ==========================================
// SERVIR ARCHIVOS DEL FRONTEND
// ==========================================

app.use(express.static(__dirname));


// ==========================================
// RUTA PRINCIPAL
// ==========================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "index.html")
    );

});


// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.listen(port, () => {

    console.log(
        `Servidor ejecutándose en http://localhost:${port}`
    );

});