var response = [];

// Módulo para transformar json em um  array
exports.handleString = function (code) {

    // Variavel que armazena as linhas
    var line = '';

    // Percorre a string de multiplas linhas e transforma em um array com cada linha do código em
    // uma posição do array, além de fazer a remoção de comentários.
    for (var prop in code) {
        if (code[prop] != '\n') {
            line += code[prop];
        } else {
            // As duas linhas respectivamente retiram o espaço do lado esquerdo da string
            // e removem os comentários.
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
