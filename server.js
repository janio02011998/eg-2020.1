const express = require('express');
const parser = require('./utils/parser');

const app = express();

app.use(express.json());

app.post('/parser', function(req, res) {
    codePost = req.body;
    
    // console.log(code);

    //Passando o json, acessando o codigo que foi enviado
    var codeArray = parser.handleString(codePost.code);
    parser.identifierC(codeArray);
    res.status(201).send('Recebido!');

});

app.listen(3333);