const express = require('express');
const router = express.Router();


function User(nombre, apellido, edad, redes, frases){
  this.nombre = nombre
  this.apellido = apellido
  this.edad = edad
  this.redes = redes
  this.frases = frases
}

let user1 = new User ("Nico", "Perez", 26, "@nicoperez", "Alguna frase");
let user2 = new User ("Dani", "Montilla", 28, [], "Otra frase");

const users = [];
users.push(user1, user2)

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("usuarios.hbs", {
    title: "Usuarios",
    users
  });
  });

module.exports = router;
