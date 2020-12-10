const express = require('express');
const parser = require('./utils/parser');

const app = express();

app.use(express.json());

app.post('/parser', function(req, res) {
    codePost = req.body;

    //Passando o json, acessando o codigo que foi enviado
    var codeArray = parser.handleString(codePost.code);
    var codeArray2 = parser.identifierC(codeArray);
    var c_use_params = parser.parseCUse(codeArray2);
    console.log(c_use_params);
    var c_use = parser.calcCUse(c_use_params);
    console.log(c_use);

    // Cálculo do uso-c aqui
    // Cálculo do uso-p aqui
    // Mais o que for necessário

    res.status(201).send(codeArray2);
});

app.listen(3333);