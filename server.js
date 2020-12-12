const express = require('express');
const cors = require('cors');
const parser = require('./utils/parser');

const app = require('express')();

app.use(express.json());
app.use(cors());

app.post('/parser', function(req, res) {
    codePost = req.body;

    //Passando o json, acessando o codigo que foi enviado
    var codeArray = parser.handleString(codePost.code);     // Transforma a string única com o código para um vetor com cada linha do código como um elmento
    var codeArray2 = parser.identifierC(codeArray);         // Faz um pré parser, define os rótulos e calcula o p-uso 
    var c_use_params = parser.parseCUse(codeArray2);        // Faz um parser de c-uso e extrai as variáveis necessárias para calcular o c-uso
    var c_use = parser.calcCUse(c_use_params);              // Cálcula o somatório de c-uso
    console.log(c_use);

    // Retorna para o frontend um valor hardcoded
    const out = require('./retorno.json');
    res.status(201).send(out);
});

app.listen(3333);