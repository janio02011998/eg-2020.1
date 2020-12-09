const express = require('express');
const parser = require('./utils/parser');

const app = express();

app.use(express.json());

app.post('/parser', function(req, res) {
    codePost = req.body;

    //Passando o json, acessando o codigo que foi enviado
    var codeArray = parser.handleString(codePost.code);
    var codeArray2 = parser.identifierC(codeArray);
    console.log(codeArray2);
    var codeArray3 = parser.teste(codeArray2);
    
    // Cálculo do uso-c aqui
    // Cálculo do uso-p aqui
    // Mais o que for necessário

    res.status(201).send(codeArray2);
});

app.listen(3333);