const mysql = require("mysql2");
const config = require("../config/config");


const connection = mysql.createConnection(config.mysql);

console.info(config.mysql);

connection.connect((error) => {
  if (error) {
    console.error(error);
    process.exit();
  }
  console.log("conectado correctamente")
});

module.exports = connection;
