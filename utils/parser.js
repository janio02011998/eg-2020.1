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

// Matriz com estrutura chave_valor 
// Ex: 
// [
//  [tipo, valor ] // Onde tipo consiste em (palavra reservada, comparações etc... e valor trata do valor da linha.).
// ]
var matriz_chave_valor = [];

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

            if (aux[j] == 'int' || aux[j] == 'while' || aux[j] == 'return' || aux[j] == 'else' || aux[j] == 'if' || aux[j] == 'main' || aux[j] == 'do' || aux[j] == 'float' ) {
                if (reserved_word.indexOf(aux[j]) < 0) {
                    reserved_word.push(aux[j]);
                }
            } else if (aux[j] == '(' || aux[j] == ')') {
                if (parentheses.indexOf(aux[j]) < 0) {
                    parentheses.push(aux[j]);
                }
            } else if (aux[j] == '+' || aux[j] == '-' || aux[j] == '/' || aux[j] == '*') {
                if (operacoes.indexOf(aux[j]) < 0) {
                    operacoes.push(aux[j]);
                }
            } else if (aux[j] == '{' || aux[j] == '}') {
                if (chaves.indexOf(aux[j]) < 0) {
                    chaves.push(aux[j]);
                }
            } else if (aux[j] == '=') {
                if (assignment.indexOf(aux[j]) < 0) {
                    assignment.push(aux[j]);
                }
            } else if (parseInt(aux[j]) >= 0 || parseInt(aux[j]) <= 0  ) { 
                number.push(aux[j]);
            
            } else if (aux[j] == '>=' || aux[j] == '<=' || aux[j] == '==' || aux[j] == '<' || aux[j] == '>') {
                comparation.push(aux[j]);
            } else if (aux[j + 1] == '(') {
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
    console.log(matriz_chave_valor);
    return matriz_chave_valor;

    //Retorno com a matriz com definições
    // return matriz_def;
}