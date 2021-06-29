const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");




// Verbos http -> get / post / etc...
router.get('/', function (req, res) {
    // send -> string
    // render -> archivos
    //res.send("Esta la seccion contacto!")
    res.render('contacto.hbs', { title: "Contacto" })
})
router.post('/', function(req, res)  {
    console.log(req.body.nombre);
    console.log(req.body.email);
    console.log(req.body.localidad); 
    let nombreForm, emailForm, localidadForm
    nombreForm = req.body.nombre
    emailForm = req.body.email
    localidadForm = req.body.localidad
    //podemos hacer una verificación
    if (nombreForm == "" || emailForm == "" || localidadForm == "" ) {
        let validacion = "Faltan datos para completar - Favor llenar el Formulario"
        res.render('contacto.hbs', {
            validacion,
            nombreForm,
            emailForm,
            localidadForm
        });
    } else {
        async function main() {
            let tranporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // use TLS
                auth: {
                    user: "matiaspagnuolo17@gmail.com",
                    pass: "jjkmymdeeuucppkc"
                }
            });
            let info = await tranporter.sendMail({
                from:`${nombreForm} <${emailForm}>`,
                to: "matiaspagnuolo17@gmail.com",
                subject: "Nuevo Contacto de la Aplicación",
                html: `Nombre: ${nombreForm} <br> Email: ${emailForm} <br> Localidad: ${localidadForm}`
            });
            res.render('formEnviado.hbs', {
                nombreForm,
                emailForm,
                localidadForm,
                envio: true
            })
        }
        main().catch(console.error);
    } 
})
module.exports = router