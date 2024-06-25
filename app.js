// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;
// Configurar o body-parser para ler dados JSON
app.use(bodyParser.json());
// Conectar ao banco de dados SQLite
let db = new sqlite3.Database(':memory:'); // Em memória para simplicidade
// Criar tabelas (veículos e usuários)
db.serialize(() => {
 db.run("CREATE TABLE veiculos (id INTEGER PRIMARY KEYAUTOINCREMENT, modelo TEXT, marca TEXT)");
 db.run("CREATE TABLE usuarios (id INTEGER PRIMARY KEYAUTOINCREMENT, nome TEXT, isAdmin INTEGER)");
 db.run("CREATE TABLE reservas (id INTEGER PRIMARY KEYAUTOINCREMENT, idUsuario INTEGER, idVeiculo INTEGER, dataReservaTEXT)");

// Inserir usuário admin padrão para testes
db.run("INSERT INTO usuarios (nome, isAdmin) VALUES ('admin',1)");
    });
    // Rota para cadastrar veículos (apenas admin)
    app.post('/veiculos', (req, res) => {// Verificar se é admin (implementar autenticação real posteriormente)
     // Aqui vamos supor que já estamos autenticados como admin
     const isAdmin = true; // Supondo que estamos autenticados como
    admin
     if (!isAdmin) {
     res.status(403).json({ error: 'Apenas administradores podemcadastrar veículos.' });
     return;
     }
     const { modelo, marca } = req.body;
     db.run(`INSERT INTO veiculos (modelo, marca) VALUES (?, ?)`,
    [modelo, marca], function(err) {
     if (err) {
     console.error(err.message);
     res.status(500).json({ error: 'Erro ao cadastrar veículo.'
    });
     } else {
     res.status(201).json({ message: 'Veículo cadastrado comsucesso.' });
     }
     });
    });
    // Rota para salvar reserva (usuário logado)
    app.post('/reservar', (req, res) => {
     const { idUsuario, idVeiculo } = req.body;
     const dataReserva = new Date().toISOString(); // Data e hora atual
     db.run(`INSERT INTO reservas (idUsuario, idVeiculo, dataReserva)
    VALUES (?, ?, ?)`, [idUsuario, idVeiculo, dataReserva], function(err)
    {
     if (err) {
     console.error(err.message);
     res.status(500).json({ error: 'Erro ao salvar reserva.'
    });
     } else {
     res.status(201).json({ message: 'Reserva realizada comsucesso.' });
     }
     });
    });
    // Iniciar o servidor
    app.listen(port, () => {
     console.log(`Servidor iniciado em http://localhost:${port}`);
    });
    