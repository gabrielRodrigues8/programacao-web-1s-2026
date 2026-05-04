const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    let html = fs.readFileSync(path.join(__dirname, 'telas', 'index.html'), 'utf-8');
    html = html.replace('{{MENSAGEM_ERRO}}', '');
    res.send(html);
});

app.post('/agendamento', (req, res) => {
    const { nome, sobrenome, cpf, dataNascimento, telefone, cep, endereco, clinica, especialidade, dataConsulta, horaConsulta, observacao } = req.body;
    let errors = [];

    const camposObrigatorios = { 'Nome': nome, 'Sobrenome': sobrenome, 'CPF': cpf, 'Data de nascimento': dataNascimento, 'Telefone': telefone, 'CEP': cep, 'Endereço': endereco, 'Clínica': clinica, 'Especialidade': especialidade, 'Data da Consulta': dataConsulta, 'Hora da Consulta': horaConsulta };

    for (const [campo, valor] of Object.entries(camposObrigatorios)) {
        if (!valor || valor.trim() === '') errors.push(`O campo "${campo}" não pode ser vazio.`);
    }

    if (dataConsulta) {
        const dataAtual = new Date();
        dataAtual.setHours(0, 0, 0, 0);
        const [ano, mes, dia] = dataConsulta.split('-');
        if (new Date(ano, mes - 1, dia) <= dataAtual) errors.push('A data do agendamento deve ser superior à data atual.');
    }

    if (errors.length > 0) {
        let html = fs.readFileSync(path.join(__dirname, 'telas', 'index.html'), 'utf-8');
        let listaErros = '<div style="color: red; background: #fee; padding: 10px; margin-bottom: 20px; border: 1px solid red;"><ul>';
        errors.forEach(erro => listaErros += `<li>${erro}</li>`);
        listaErros += '</ul></div>';
        html = html.replace('{{MENSAGEM_ERRO}}', listaErros);
        return res.send(html);
    }

    let htmlSucesso = fs.readFileSync(path.join(__dirname, 'telas', 'agendamentos.html'), 'utf-8');
    
    htmlSucesso = htmlSucesso.replace('{{NOME}}', nome)
                             .replace('{{SOBRENOME}}', sobrenome)
                             .replace('{{CPF}}', cpf)
                             .replace('{{DATA_NASCIMENTO}}', dataNascimento)
                             .replace('{{TELEFONE}}', telefone)
                             .replace('{{CEP}}', cep)
                             .replace('{{ENDERECO}}', endereco)
                             .replace('{{CLINICA}}', clinica)
                             .replace('{{ESPECIALIDADE}}', especialidade)
                             .replace('{{DATA_CONSULTA}}', dataConsulta)
                             .replace('{{HORA_CONSULTA}}', horaConsulta)
                             .replace('{{OBSERVACAO}}', observacao || 'Nenhuma observação.');

    res.send(htmlSucesso);
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});