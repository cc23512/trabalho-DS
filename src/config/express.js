const express = require("express");
const session = require('express-session');
const moment = require("moment");
const app = express();

app.use(session({
    secret: 'BD23512', // Substitua com uma string secreta mais segura
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Defina para true se estiver usando HTTPS
}));
// ...
app.use(express.static('public'));
app.use(express.static('views'))

const bodyParser = require("body-parser");
const expressLayout = require("express-ejs-layouts");
app.use(bodyParser.urlencoded({ extended: true })); 
app.set("view engine", "ejs");
app.use(expressLayout);

app.locals.moment = moment;
// ...



const rotas = require("../app/ROTAS/rotas");
rotas(app);


module.exports = app;