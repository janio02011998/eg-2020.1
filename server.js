const express = require('express');
const parser = require('./utils/parser');

const app = express();

app.use(express.json());

app.post('/parser', function(req, res) {
    codePost = req.body;
    
    // console.log(code);

    //Passando o json, acessando o codigo que foi enviado
    var codeArray = parser.handleString(codePost.code);

    res.status(201).send('Recebido!');

    console.log(codeArray);
});

app.listen(3333);