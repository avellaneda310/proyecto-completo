var express = require('express');
var router = express.Router();
const sqlCon = require('../utils/conection')

/* GET home page. */
router.get('/', function(req, res, next) {
  sqlCon.query('SELECT * FROM usuarios', (err, result) => {
    if (err) {
      console.error(err);
      res.render('error');
    }
    console.log(result)
    res.render('index', { title: 'Express', persons: result });
  });
});
router.get('/new-user', (req, res) => {
  res.render('new-user');
});
router.post('/create-user', (req, res) => {
  const persona = req.body;
  if (!persona.nombre) {
    return res.render('error');
  }
  sqlCon.query(`
    INSERT INTO \`usuarios\` (\`email\`, \`password\`, \`nombre\`) 
    VALUES ('${persona.email}', '${persona.password}', '${persona.nombre}');
    `,
    (err, result) => {
      if (err) {
        console.error(err);
        return res.render('error');
      }
      console.log(result);
      res.render('success', { nombre: persona.nombre, result });
    }
  );
});

router.get('/api',function(req, res){
  res.jason({massage: ''});
})

module.exports = router;
