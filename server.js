const express = require('express');
const parser = require('./utils/parser');

const app = express();

app.use(express.json());

app.post('/', function(req, res) {
    code  = req.query.code;
    
    var codeArray = parser.handleString(code);

    res.status(201).send('Recebido!');

    console.log(codeArray);
});

app.listen(3333);