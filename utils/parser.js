// Váriavel que armazena o código enviado em formato de Arra, cada linha do array corresponde a uma linha do código original.
var response = [];

// Váriavel que armazena o código em formato de Matriz, onde cada linha e coluna corresponde a uma palavra no digitado no código orinal;
var arrayOfString = [];

//Váriavel que armazena as constantes do código;
var variable = [];

//Váriavel que armazena as constantes do código;
var number = [];

//Váriavel que armazena as |int, while, main, return| do código;
var reserved_word = [];

//Váriavel que armazena os | (, ) | do código;
var parentheses = [];

//Váriavel que armazena as comparações | = | do código;
var assignment = [];

//Váriavel que armazena os | }, { | do código;
var chaves = [];

//Váriavel que armazena os | >, <, =,  | do código;
var comparation = [];

//Váriavel que armazena os nomes de funções do código;
var name_function = [];

//Váriavel que armazena as operacoes matematica;
var operacoes = [];

//Váriavel que armazena oas definições de cada linha;
var linha_com_definicoes = ' ';

// Matriz com as definições
var matriz_def = [];

//Variaveis Caso Test
var tam = 5;
var esq = 0;
var dir = tam-1;
var pUse = 0;
var mid = (esq + dir)/2;
var v = [10, 20, 30, 40, 50];
valor = 40;
// Matriz com estrutura chave_valor 
// Ex: 
// [
//  [tipo, valor ] // Onde tipo consiste em (palavra reservada, comparações etc... e valor trata do valor da linha.).
// ]
var matriz_chave_valor = [];

// Array de variáveis
// {
//     identificador: ,
//     tipo: ,
//     def: ,
//     ultimoUso: ,
//     valor: ,
// }
var variaveis = []

// Array de objetos com os valores de w, d e c
// {
//     w: [],
//     d: [],
//     c: [],
// }
var c_uso = []

//Váriavel que armazena as operacoes logicas;
var logicOperation = [];

//Variavel para contagem de p-use;
var pUseCount = 0;

// Entrada: | tipo var |
// Testa corretamente se é um definição
const isDef = function(matriz_chave_valor, i) {
    if (matriz_chave_valor[i][2] == "int" || matriz_chave_valor[i][2] == "float" || matriz_chave_valor[i][2] == "char") {
        if (matriz_chave_valor[i+1][1] == "variable") {
            return true;
        }
    }
    return false;
}

// Entrada: | tipo var |
// Faz parse de definição e adiciona na lista de variaveis
const parseDef = function(matriz_chave_valor, i) {  
    if (matriz_chave_valor[i][1] == "variable") {
        variaveis.push({
            name: matriz_chave_valor[i][2],
            value: 0,
        })
    }
}

// Entrada: | var '=' ...|
// Testa se está havendo uma atribuição numa variavel corretamente
const isAttr = function(matriz_chave_valor, i){
    if (matriz_chave_valor[i][1] == "variable" && matriz_chave_valor[i+1][1] == 'assignment'
    && (matriz_chave_valor[i+2][1] == "variable" || matriz_chave_valor[i+2][1] == "number" || (matriz_chave_valor[i+2][2] == "-" && matriz_chave_valor.length-1 >= i+3))){
        return true;
    }
    return false;
}

// Entrada: | var '=' ...|
//TODO: Comentar
const parseEqu = function(matriz_chave_valor, i){
    let value = '';
    let next_i;
    let v = '';
    if (matriz_chave_valor[i + 2][2] == "-") {
        if (matriz_chave_valor[i + 3][1] == "variable") {
            for (let j in variaveis) {
                 if (variaveis[j].name == matriz_chave_valor[i + 3][2]) {
                     v = variaveis[j].value;
                 }
            }
            value += matriz_chave_valor[i+2][2] + v;
        } else {
            value += matriz_chave_valor[i+2][2] + matriz_chave_valor[i+3][2]
        }
        next_i = i + 4;
    } else {
        if (matriz_chave_valor[i + 2][1] == "variable") {
            for (let j in variaveis) { 
                if (variaveis[j].name == matriz_chave_valor[i + 2][2].replace('-','')) {
                    v = variaveis[j].value;
                }
            }
            if (matriz_chave_valor[i + 2][2].startsWith('-')) {
                value = '-' + v;
            } else {
                value = v; 
            }
        } else {
            value = matriz_chave_valor[i+2][2];
        }
        next_i = i + 3;
    }
    value += ' ';
    
    if (matriz_chave_valor.length-1 <= next_i) {
        for (let j in variaveis) {
            if (variaveis[j].name == matriz_chave_valor[i][2]) {
                 variaveis[j].value = eval(value);
            }
        }
        return;
    }

    while(matriz_chave_valor[next_i][1] == "operacoes") {
        if (matriz_chave_valor[next_i+1][2] == "-") {
            if (matriz_chave_valor[next_i+2][1] == "variable") {
                for (let j in variaveis) {
                    if (variaveis[j].name == matriz_chave_valor[next_i+2][2]) {
                        v = variaveis[j].value;
                    }
                }
                value += matriz_chave_valor[next_i][2] + ' ' + matriz_chave_valor[next_i+1][2] + ' ' + v;
            } else {
                value += matriz_chave_valor[next_i][2] + ' ' + matriz_chave_valor[next_i+1][2] + ' ' + matriz_chave_valor[next_i+2][2];
            }
            next_i += 3;
        } else {
            if (matriz_chave_valor[next_i+1][1] == "variable") {
                for (let j in variaveis) {
                    if (variaveis[j].name == matriz_chave_valor[next_i+1][2].replace('-','')) {
                        v = variaveis[j].value;
                    }
                }
                if (matriz_chave_valor[next_i+1][2].startsWith('-')) {
                    value += matriz_chave_valor[next_i][2] + ' ' + '-' + v;
                } else {
                    value += matriz_chave_valor[next_i][2] + ' ' + v;
                }
            } else {
                value += matriz_chave_valor[next_i][2] + ' ' + matriz_chave_valor[next_i+1][2];
            }
            next_i += 2;
        }
        if (matriz_chave_valor.length-1 <= next_i) {
            for (let j in variaveis) { 
                if (variaveis[j].name == matriz_chave_valor[i][2]) {
                    variaveis[j].value = eval(value);
                }
            }
            return;
        }
        value += ' ';
    }
    for (let j in variaveis) { 
        if (variaveis[j].name == matriz_chave_valor[i][2]) {
             variaveis[j].value = eval(value);
        }
    }
    return;
}

const getCUseParams = function(matriz_chave_valor, linha, start_index){
    let i = 0;
    const line_c_uso = {
        w: [],
        d: [],
        c: [],
    }
    console.log("Start -------------------------------");
    while(matriz_chave_valor[start_index + i][0] == linha) {
        console.log("C-Use", matriz_chave_valor[start_index + i]);
        // Fazer povoamento do w, d e c aqui
        if (matriz_chave_valor[start_index + i][1] == "variable") {
            let v;
            for (let j in variaveis) { 
                if (variaveis[j].name == matriz_chave_valor[start_index + i][2]) {
                    v = variaveis[j].value;
                }
            }
            line_c_uso.w.push(v); //.trim() ?
        }
        if (matriz_chave_valor[start_index + i][1] == "operacoes" || matriz_chave_valor[start_index + i][1] == "assignment") {
            line_c_uso.d.push(matriz_chave_valor[start_index + i][2]);
        }
        if (matriz_chave_valor[start_index + i][1] == "number") {
            line_c_uso.c.push(matriz_chave_valor[start_index + i][2]);
        }

        if (matriz_chave_valor.length-1 == start_index + i + 1) {
            break;
        } else {
            i++;
        }
    }
    console.log("End -------------------------------");
    return line_c_uso;
}

// Módulo para transformar json em um  array
exports.handleString = function (code) {
    // console.log(code.code);
    // Variavel que armazena as linhas
    var line = '';

    // Percorre a string de multiplas linhas e transforma em um array com cada linha do código em
    // uma posição do array, além de fazer a remoção de comentários.
    for (var prop in code) {
        // if (code[prop] != '\n') {
        if (code[prop] != '{' && code[prop] != ';' && code[prop] != '}') {
            line += code[prop];
        } else {
            // As duas linhas respectivamente retiram o espaço do lado esquerdo da string
            // e removem os comentários.
            line += code[prop];

            line = line.replace(/^\s+/g, '');
            line = line.indexOf('//') ? line : '';

            response.push(line);
            line = '';
            continue;
        }
    }

    //Remove os espaços em brancos
    response = response.filter(function (str) {
        return /\S/.test(str);
    });

    // console.log(resposta);
    return response;
}

exports.identifierC = function (code) {
    // Palavras reservadas do C do código do projeto
    // int, while, if, else, return 

    // Delimetador de linhas do C
    // {, }, (, )

    // O laço abaixo pecorrer um array em que cada indíce é uma linha do código recebido em formato de string,
    // Cada linha então, e subdivida em um novo array, onde cada elemento tornasse um indice 
    // Ex
    // entrada => 'int main (int c, int v) { }
    // retorna => ['int', 'main', '(', 'int', 'c', 'int', 'v', ')', '{', '}' ].
    for (var i = 0; i < code.length; i++) {
        arrayOfString.push(code[i].replace(/\(/g, "( ").replace(/\)/g, " ) ").replace(';', '').split(/[\s]+/));
    }

    // A estrutura abaixo pecorre a matriz do código palava por palavra.
    for (var i = 0; i < arrayOfString.length; i++) {

        // salvando a linha a linha da matriz no array aux.
        var aux = arrayOfString[i];

        // percorrendo item a item da matriz no array aux.
        for (var j = 0; j < aux.length; j++) {
            // console.log(aux[j]);

            if (aux[j] == 'while' || aux[j] == 'if') {
                 pUseCount += 1;    //Contando p-use
            } 

            //*********   Parte do codigo que vai realizar o calculo do M(p-uso)    esquerda + operadorlogico + direita + resultado da operaçao
            if (aux[j] == '>=') {  
                pUse = pUse + esq + 62 + 61 + dir + (esq>=dir);
            }
            if (aux[j] == '<=') {
                pUse = pUse + esq + 60 + 61 + dir + (esq<=dir);
            }
            if (aux[j] == '=='){
                pUse = pUse + v[mid] + 61 + 61 + valor + (esq==dir);
            } 
            if (aux[j] == '<' ){
                pUse = pUse + v[mid] + 60 + valor + (esq<dir);
            }
            if (aux[j] == '>'){
                pUse = pUse + esq + 62 + dir + (esq>dir);
            }                    
            //********* Fim da parte do calculo do M(p-uso)

            if (aux[j] == 'int' || aux[j] == 'while' || aux[j] == 'return' || aux[j] == 'else' || aux[j] == 'if' || aux[j] == 'main' || aux[j] == 'do' || aux[j] == 'float' || aux[j] == 'for') {
                if (reserved_word.indexOf(aux[j]) < 0) {    // Testa se a palavra é reservada
                    reserved_word.push(aux[j]);
                }
            } else if (aux[j] == '(' || aux[j] == ')') {    // Testa se é um parentese
                if (parentheses.indexOf(aux[j]) < 0) {
                    parentheses.push(aux[j]);
                }
            } else if (aux[j] == '+' || aux[j] == '-' || aux[j] == '/' || aux[j] == '*') {  // Testa se é um operador
                if (operacoes.indexOf(aux[j]) < 0) {
                    operacoes.push(aux[j]);
                }
            } else if (aux[j] == '||' || aux[j] == '&&' || aux[j] == '!') { // Testa se é um operador lógico
                if (logicOperation.indexOf(aux[j]) < 0) {
                    logicOperation.push(aux[j]);
                }
            } else if (aux[j] == '{' || aux[j] == '}') {    // Testa se é uma chave
                if (chaves.indexOf(aux[j]) < 0) {
                    chaves.push(aux[j]);
                }
            } else if (aux[j] == '=') {                     // Testa se é um operador de atribuição
                if (assignment.indexOf(aux[j]) < 0) {
                    assignment.push(aux[j]);
                }
            } else if (parseInt(aux[j]) >= 0 || parseInt(aux[j]) <= 0  ) {  // Testa se a entrada é um numero / constante
                number.push(aux[j]);
            } else if (aux[j] == '>=' || aux[j] == '<=' || aux[j] == '==' || aux[j] == '<' || aux[j] == '>') {  // Testa se são operadores de comparação
                comparation.push(aux[j]);
            } else if (aux[j + 1] == '(') { // Caso especial para funções
                name_function.push(aux[j]);
            } else {
                if (variable.indexOf(aux[j]) < 0) {
                    variable.push(aux[j]);
                }
            }

        }

    }

    for (var count = 0; count < arrayOfString.length; count++) {
        var linha_da_matriz = arrayOfString[count];
        // Laço pecorre o array de comandos linha a linha convertendo os comandos em suas classes (constantes, palavras_reservadads, atribuições
        // nome_de_função entre outros);

        linha_com_definicoes = linha_com_definicoes.concat("/*"+count+"*/  ");
        for (var i = 0; i < linha_da_matriz.length; i++) {
            // console.log(linha_da_matriz);
                var chave_valor = [];
                chave_valor.push(count+1);
                if (reserved_word.includes(linha_da_matriz[i])) {
                    // linha_com_definicoes = linha_com_definicoes.concat(linha_da_matriz[i]+ ' ');
                    linha_com_definicoes = linha_com_definicoes.concat(' palavra_reservada ');
                    chave_valor.push("palavra_reservada", linha_da_matriz[i], count);
                }
                if (parentheses.includes(linha_da_matriz[i])) {
                    linha_com_definicoes = linha_com_definicoes.concat(linha_da_matriz[i]+ ' ');
                    chave_valor.push("parentheses", linha_da_matriz[i], count);
                }
                if (variable.includes(linha_da_matriz[i])) {
                    // linha_com_definicoes = linha_com_definicoes.concat(linha_da_matriz[i]+ ' ');
                    linha_com_definicoes = linha_com_definicoes.concat(' variavel ');
                    chave_valor.push("variable", linha_da_matriz[i], count);
                } 
                if (number.includes(linha_da_matriz[i])) {
                    // linha_com_definicoes = linha_com_definicoes.concat(linha_da_matriz[i]+ ' ');
                    linha_com_definicoes = linha_com_definicoes.concat(' number ');
                    chave_valor.push("number", linha_da_matriz[i], count);
                } 
               
                if (chaves.includes(linha_da_matriz[i])) {
                    linha_com_definicoes = linha_com_definicoes.concat(linha_da_matriz[i]+ ' ');
                    chave_valor.push("chaves", linha_da_matriz[i], count);
                }
                if (name_function.includes(linha_da_matriz[i])) {
                    // linha_com_definicoes = linha_com_definicoes.concat(linha_da_matriz[i]+ ' ');
                    linha_com_definicoes = linha_com_definicoes.concat(' function ');
                    chave_valor.push("name_function", linha_da_matriz[i], count);
                }
                if (assignment.includes(linha_da_matriz[i])) {
                    linha_com_definicoes = linha_com_definicoes.concat(linha_da_matriz[i]+ ' ');
                    chave_valor.push("assignment", linha_da_matriz[i], count);
                }
                if (logicOperation.includes(linha_da_matriz[i])) {
                    linha_com_definicoes = linha_com_definicoes.concat(linha_da_matriz[i]+ ' ');
                    chave_valor.push("OperacaoLogica", linha_da_matriz[i])
                }
                if (comparation.includes(linha_da_matriz[i])) {
                    linha_com_definicoes = linha_com_definicoes.concat(linha_da_matriz[i]+ ' ');
                    chave_valor.push("comparation", linha_da_matriz[i], count);
                }
                if (operacoes.includes(linha_da_matriz[i])) {
                    linha_com_definicoes = linha_com_definicoes.concat(linha_da_matriz[i]+ ' ');
                    chave_valor.push("operacoes", linha_da_matriz[i], count);
                }
                matriz_chave_valor.push(chave_valor);
            }
        
        matriz_def.push(linha_com_definicoes);
        linha_com_definicoes = '';
    }
    
    // Retorno chave_valor;
    // console.log(matriz_chave_valor);
    //console.log (`Calculo P-uso: ${pUse}`);
    console.log("Variáveis: ", variable);
    return matriz_chave_valor;

    //Retorno com a matriz com definições
    // return matriz_def;
}

// !! TODO: Comentar
exports.parseCUse = function(matriz_chave_valor) {
    let linha = 1;
    // let line = [];
    // let i = 0;

    const lastLine = matriz_chave_valor[matriz_chave_valor.length-1][0];
    console.log("Lastline: ", lastLine);

    let last_i = 0;
    while(linha <= lastLine) {
        let i;
        let isCUse = false;
        for (i = last_i; linha == matriz_chave_valor[i][0]; i++) {
            console.log(matriz_chave_valor[i]);
            if (i == matriz_chave_valor.length-1) {
                break;
            }
            // fazer o parser aqui
            if (isDef(matriz_chave_valor, i)) {      // Detecta se há uma estrutura '| tipo var |' na linha
                parseDef(matriz_chave_valor, i+1);
                // console.log(`Def na linha ${linha}: ${matriz_chave_valor[i][2]} ${matriz_chave_valor[i+1][2]}`);

                if (isAttr(matriz_chave_valor, i+1)) {   // Detecta se há uma estrutura '| var '=' ... |' (Se houver, então constitui c-uso)
                    isCUse = true;
                    parseEqu(matriz_chave_valor, i+1)
                    // console.log(`Var ${matriz_chave_valor[i][2]} também possui atribuição com o valor ${matriz_chave_valor[i+2][2]}!`);
                }
            }
            else if (isAttr(matriz_chave_valor, i)) {   // Detecta se há uma estrutura '| var '=' ... |' (Se houver, então constitui c-uso)
                isCUse = true;
                parseEqu(matriz_chave_valor, i);
            }
        }
        if (isCUse) {   // Adiciona uma entrada no array de cUso para o front
            c_uso.push(getCUseParams(matriz_chave_valor, linha, last_i));
        }
        console.log("\n");
        // Faz um update na linha
        last_i = i;
        linha++;
    }
    console.log(variaveis);
    console.log(c_uso);
    return c_uso;
}

exports.calcCUse = function(c_use_params){
    let s = []
    let s1, s2, s3;
    for (param of c_use_params){
        if (param.w.length > 0) {
            s1 = param.w.reduce((acc, value) => {
                let v = 0;
                if (typeof value == "string") {
                    for (let char of value) v += parseInt(char.charCodeAt(0), 10);
                    v += acc;
                }
                if (typeof value == "number") v = acc + value;
                return v;
            });
        } else {
            s1 = 0;
        }
        if (param.d.length > 0) {
            s2 = param.d.reduce((acc, value) => typeof value == "number" ? acc + value : acc + value.charCodeAt(0), 0)
        } else {
            s2 = 0;
        }
        if (param.c.length > 0) {
            s3 = param.c.reduce((acc, value) => {
                let v = 0;
                if (typeof value == "string") {
                    for (let char of value) v += parseInt(char.charCodeAt(0), 10);
                    v += acc;
                }
                if (typeof value == "number") v = acc + value;
                return v;
            });
        } else {
            s3 = 0;
        }
        s.push(s1 + s2 + s3);
    }

    let count = 0;
    let sumTotal = 0;
    s.forEach((sum) => {
        console.log("Linha: ", c_use_params[count]);
        console.log(`Soma ${++count}: ${sum.toString(16)}\n`);
        sumTotal += sum;
    });
}