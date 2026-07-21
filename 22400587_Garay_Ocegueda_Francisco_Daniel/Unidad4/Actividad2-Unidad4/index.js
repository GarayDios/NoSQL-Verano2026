const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 3000;

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Hola Mundo");
});

app.get("/mensaje", (req, res) => {
    res.send("Mensaje desde Express");
});

app.get("/pagina", (req, res) => {
    const nombre = "daniel"
    res.send(`
        <style>
            .p1 {
                color: red;
                background: blue;
            }
        </style>
        <h1>Mi Pagina Web</h1>
        <p class="p1">Creada con express</p>
        <p class="p1">Hola ${nombre}</p>

    `);
});

app.get("/alumno", (req, res) => {
    res.json({
        nombre: "Daniel",
        carrera: "ISC",
        semestre: 9
    });
});

app.get("/materias", (req, res) => {
    res.json([
        {
            nombre: "NoSQL", 
            hora: "8:00 - 11:00"
        },
        {
            nombre: "Programacion Web", 
            hora: "14:00 - 17:00"
        },
    ]);
});

app.get("/mensaje/:nombre", (req, res) => {
    res.send(`Hola ${req.params.nombre}`);
});

app.get("/suma/:a/:b", (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.send(`Resultado de ${a} + ${b} = ${a+b}`);
});

app.get("/multiplicar/:a/:b", (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.send(`Resultado de ${a} * ${b} = ${a*b}`);
});

app.get("/aleatorio", (req, res) => {
    const numero = Math.floor(Math.random() * 100) + 1;
    res.send(`Nuemro generado: ${numero}`);
});

app.get("/par/:numero", (req, res) => {
    const numero = parseInt(req.params.numero);

    if (numero % 2 === 0) {
        res.send(`${numero} es un número par.`);
    } else {
        res.send(`${numero} es un número impar.`);
    }
});
app.get("/edad/:edad", (req, res) => {
    const edad = parseInt(req.params.edad);

    if (edad >= 18) {
        res.send("Eres mayor de edad.");
    } else {
        res.send("Eres menor de edad.");
    }
});
app.get("/calculadora/:operacion/:a/:b", (req, res) => {

    const operacion = req.params.operacion.toLowerCase();
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);

    let resultado;

    switch (operacion) {

        case "suma":
            resultado = a + b;
            break;

        case "resta":
            resultado = a - b;
            break;

        case "multiplicacion":
            resultado = a * b;
            break;

        case "division":
            if (b === 0) {
                return res.send("No se puede dividir entre cero.");
            }
            resultado = a / b;
            break;

        default:
            return res.send("Operación no válida.");
    }

    res.send(`Resultado: ${resultado}`);
});
app.get("/tabla/:numero", (req, res) => {

    const numero = parseInt(req.params.numero);

    let tabla = [];

    for (let i = 1; i <= 10; i++) {

        tabla.push(`${numero} x ${i} = ${numero * i}`);

    }

    res.json(tabla);

});
app.get("/calificacion/:nota", (req, res) => {

    const nota = parseFloat(req.params.nota);

    if (nota >= 90) {
        res.send("Excelente");
    }
    else if (nota >= 80) {
        res.send("Muy bien");
    }
    else if (nota >= 70) {
        res.send("Aprobado");
    }
    else {
        res.send("Reprobado");
    }

});


app.listen(PORT, () => {
    console.log("Servidor iniciado en http://localhost:" + PORT);
});

