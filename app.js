import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var tareas = [];
var tareasTrabajo = [];

const date = new Date();
let dia = date.getDate();

let mesActual = new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
  new Date()
);
let fecha = dia + " de " + mesActual;

app.get("/", (req, res) => {
  
  res.render("index.ejs", {
    tareasPendientes: tareas,
    fechaHoy: fecha,
  });
});

app.get("/trabajo", (req, res) => {
  
  res.render("trabajo.ejs", {
    tareasTrabajo: tareasTrabajo,
    fechaHoy: fecha,
  });
});

app.post("/", (req, res) => {
  var tarea = req.body.tarea;

  if (tarea) {
    tareas.push(tarea);
    console.log(tareas);

    res.redirect("/");
  }
});

app.post("/trabajo", (req, res) => {
  var tareaTrabajo = req.body.tarea;

  if (tareaTrabajo) {
    tareasTrabajo.push(tareaTrabajo);
    console.log(tareasTrabajo);

    res.redirect("/trabajo");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
