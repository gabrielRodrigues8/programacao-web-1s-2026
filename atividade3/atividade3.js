const express = require('express');
const app = express();

const PORT = 3000;

let estoque = [];

app.get('/adicionar/:id/:nome/:qtd', (req, res) => {
    const { id, nome, qtd } = req.params;

    const produto = {
        id,
        nome,
        qtd: parseInt(qtd)
    };

    estoque.push(produto);

    res.send('Produto adicionado com sucesso!');
});

app.get('/listar', (req, res) => {
    res.json(estoque);
});

app.get('/remover/:id', (req, res) => {
    const { id } = req.params;

    estoque = estoque.filter(p => p.id !== id);

    res.send('Produto removido com sucesso!');
});

app.get('/editar/:id/:qtd', (req, res) => {
    const { id, qtd } = req.params;

    const produto = estoque.find(p => p.id === id);

    if (!produto) {
        return res.send('Produto não encontrado!');
    }

    produto.qtd = parseInt(qtd);

    res.send('Quantidade atualizada com sucesso!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});