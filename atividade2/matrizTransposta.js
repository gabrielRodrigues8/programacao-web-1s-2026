function transporMatriz(A) {
    console.log("Matriz Original:");
    for (let i = 0; i < A.length; i++) {
        console.log(A[i].join('\t'));
    }
    let transposta = [];
    for (let i = 0; i < A[0].length; i++) { 
        let novaLinha = [];
        for (let j = 0; j < A.length; j++) { 
            novaLinha.push(A[j][i]);
        }
        transposta.push(novaLinha);
    }
    console.log("\nMatriz Transposta:");
    for (let i = 0; i < transposta.length; i++) {
        console.log(transposta[i].join('\t'));
    }
}
const matrizExemplo = [
    [1, 2],
    [3, 4],
    [5, 6]
];

transporMatriz(matrizExemplo);