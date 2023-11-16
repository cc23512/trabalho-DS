const mysql = require("mysql2");

const connection = mysql.createConnection({
    host:     'regulus.cotuca.unicamp.br',
    user:     'BD23512',
    password: 'BD23512',
    database: 'BD23512',
});

connection.connect(function (erro) {
    if (erro){
        console.log("ERRO NA CONEXÃO COM O BD23512.");
        console.log(erro)
    }else{
        console.log("Conexão com o BD23512 realizada com SUCESSSO.");
    }
});

module.exports = connection;