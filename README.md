# Project Title: Parser

## Description

Parser para reconhecimento de uma função em linguagem c.

possui 4 branchs: 

1. main -> merge dos branchs 2 e 3, além do código base parser base usado para criação dos branch 2 e 3.
2. c_uso -> codígo com as funcionalideades para c_uso. 
3. p-useCount -> funcionalidades de contagem de p-uso. (OBS: apresenta erros).
4. integracao_c-p_uso -> merge dos branch 2 e 3 para debug e teste. 

## Getting Started

* git clone https://github.com/janio02011998/eg-2020.1.git
* npm install
* npm start 

>Baixar o postman ou insomnia aberto, criar um requisição do tipo post para o endereço: http://localhost:3333/parser

>No campo de envio de dados cole o seguinte json com seguinte texto: 
```
{
"code":"int buscaBin (int valor, int tam, int v[]) {  int esq = 0, mid, dir = tam - 1;  while (esq <= dir) {  mid = (esq + dir) / 2; if (v[mid] == valor) return mid;   if (v[mid] < valor)  esq = mid + 1;  else  dir = mid - 1; }   return -1; } "
}
```
> exemplo com imagem utilizando o insomnia encontra-se na pasta docs.

### Saída esperada no terminal
~~~
[
  [ 1, 'palavra_reservada', 'int', 0 ], 
  [ 1, 'name_function', 'buscaBin', 0 ],
  [ 1, 'parentheses', '(', 0 ],
  [ 1, 'palavra_reservada', 'int', 0 ],
  [ 1, 'variable', 'valor,', 0 ],
  [ 1, 'palavra_reservada', 'int', 0 ],
  [ 1, 'variable', 'tam,', 0 ],
  [ 1, 'palavra_reservada', 'int', 0 ],
  [ 1, 'variable', 'v[]', 0 ],
  [ 1, 'parentheses', ')', 0 ],
  [ 1, 'chaves', '{', 0 ],
  [ 2, 'palavra_reservada', 'int', 1 ],
  [ 2, 'variable', 'esq', 1 ],
  [ 2, 'assignment', '=', 1 ],
  [ 2, 'number', '0,', 1 ],
  [ 2, 'variable', 'mid,', 1 ],
  [ 2, 'variable', 'dir', 1 ],
  [ 2, 'assignment', '=', 1 ],
  [ 2, 'variable', 'tam', 1 ],
  [ 2, 'operacoes', '-', 1 ],
  [ 2, 'number', '1', 1 ],
  [ 3, 'palavra_reservada', 'while', 2 ],
  [ 3, 'parentheses', '(', 2 ],
  [ 3, 'variable', 'esq', 2 ],
  [ 3, 'comparation', '<=', 2 ],
  [ 3, 'variable', 'dir', 2 ],
  [ 3, 'parentheses', ')', 2 ],
  [ 3, 'chaves', '{', 2 ],
  [ 4, 'variable', 'mid', 3 ],
  [ 4, 'assignment', '=', 3 ],
  [ 4, 'parentheses', '(', 3 ],
  [ 4, 'variable', 'esq', 3 ],
  [ 4, 'operacoes', '+', 3 ],
  [ 4, 'variable', 'dir', 3 ],
  [ 4, 'parentheses', ')', 3 ],
  [ 4, 'operacoes', '/', 3 ],
  [ 4, 'number', '2', 3 ],
  [ 5, 'palavra_reservada', 'if', 4 ],
  [ 5, 'parentheses', '(', 4 ],
  [ 5, 'variable', 'v[mid]', 4 ],
  [ 5, 'comparation', '==', 4 ],
  [ 5, 'variable', 'valor', 4 ],
  [ 5, 'parentheses', ')', 4 ],
  [ 5, 'palavra_reservada', 'return', 4 ],
  [ 5, 'variable', 'mid', 4 ],
  [ 6, 'palavra_reservada', 'if', 5 ],
  [ 6, 'parentheses', '(', 5 ],
  [ 6, 'variable', 'v[mid]', 5 ],
  [ 6, 'comparation', '<', 5 ],
  [ 6, 'variable', 'valor', 5 ],
  [ 6, 'parentheses', ')', 5 ],
  [ 6, 'variable', 'esq', 5 ],
  [ 6, 'assignment', '=', 5 ],
  [ 6, 'variable', 'mid', 5 ],
  [ 6, 'operacoes', '+', 5 ],
  [ 6, 'number', '1', 5 ],
  [ 7, 'palavra_reservada', 'else', 6 ],
  [ 7, 'variable', 'dir', 6 ],
  [ 7, 'assignment', '=', 6 ],
  [ 7, 'variable', 'mid', 6 ],
  [ 7, 'operacoes', '-', 6 ],
  [ 7, 'number', '1', 6 ],
  [ 8, 'chaves', '}', 7 ],
  [ 9, 'palavra_reservada', 'return', 8 ],
  [ 9, 'number', '-1', 8 ],
  [ 10, 'chaves', '}', 9 ]
]

Calculo P-uso: 449

SyntaxError: Unexpected end of input 
    at parseEqu (C:\Users\Janio\OneDrive\Área de Trabalho\Myprojects\Javascript\www\serverParser\utils\parser.js:218:40)
    at Object.exports.parseCUse (C:\Users\Janio\OneDrive\Área de Trabalho\Myprojects\Javascript\www\serverParser\utils\parser.js:472:21)
    at C:\Users\Janio\OneDrive\Área de Trabalho\Myprojects\Javascript\www\serverParser\server.js:16:31
    at Layer.handle [as handle_request] (C:\Users\Janio\OneDrive\Área de Trabalho\Myprojects\Javascript\www\serverParser\node_modules\express\lib\router\layer.js:95:5)
~~~