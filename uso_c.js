const lines = [{
    w: [40, 5, 150], // 28, 5, 96
    d: [0],
    c: [0],
},
{
    w: [0, 0, 4, 5],
    d: ['=','=','-'], // '>=', '<=', '==', '!=', etc devem ocupar índices separados
    c: [1],
},
{
    w: [2, 0, 4],
    d: ['=','+','/'],
    c: [2],
}]

/* 
Para cada linha
    - Fazer o parser das variáveis com uso-c naquela linha e transformar seus valores em hexadecimal;
    - Fazer o parser dos operadores usados na linha e transformá-los em hexadecimal;
    - Fazer o parser das constantes na linha e transformá-las em hexadecimal;
    - Fazer o somatório de todos os valores;
Depois
    - Fazer o somatório de todos os valores obtidos em cada linha. 
*/ 

let s = []
for (line of lines){
    let s1 = line.w.reduce((acc, value) => {
        let v = 0;
        if (typeof value == "string") {
            for (let char of value) v += parseInt(char.charCodeAt(0), 10);
            v += acc;
        }
        if (typeof value == "number") v = acc + value;
        return v;
    });
    let s2 = line.d.reduce((acc, value) => typeof value == "number" ? acc + value : acc + value.charCodeAt(0), 0)
    let s3 = line.c.reduce((acc, value) => {
        let v = 0;
        if (typeof value == "string") {
            for (let char of value) v += parseInt(char.charCodeAt(0), 10);
            v += acc;
        }
        if (typeof value == "number") v = acc + value;
        return v;
    });
    s.push(s1 + s2 + s3)
}

let count = 0
let sumTotal = 0
s.forEach((sum) => {
    console.log("Linha: ", lines[count]);
    console.log(`Soma ${++count}: ${sum.toString(16)}\n`);
    sumTotal += sum;
})
sumTotal = sumTotal.toString(16);
console.log("Soma total:", sumTotal);