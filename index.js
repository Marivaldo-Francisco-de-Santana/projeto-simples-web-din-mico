const express = require('express');
const mysql = require('mysql2');

const app = express();

// CONFIGURAÇÃO DO MYSQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sistema_vendas'
});

db.connect((err) => {
    if (err) {
        console.log('Erro ao conectar ao MySQL:', err);
        return;
    }

    console.log('MySQL conectado com sucesso!');
});

// CONFIGURAÇÕES
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// PÁGINA INICIAL
app.get('/', (req, res) => {
    res.redirect('/clientes');
});


// =========================
// CLIENTES
// =========================

// LISTAR CLIENTES
app.get('/clientes', (req, res) => {

    db.query(
        'SELECT * FROM clientes',
        (err, clientes) => {

            if (err) {
                console.log(err);
                return res.send('Erro ao carregar clientes');
            }

            res.render('clientes', { clientes });
        }
    );

});

// CADASTRAR CLIENTE
app.post('/clientes', (req, res) => {

    const { nome, telefone, email } = req.body;

    db.query(
        'INSERT INTO clientes (nome, telefone, email) VALUES (?, ?, ?)',
        [nome, telefone, email],
        (err) => {

            if (err) {
                console.log(err);
                return res.send('Erro ao cadastrar cliente');
            }

            res.redirect('/clientes');
        }
    );

});

// EXCLUIR CLIENTE
app.get('/clientes/excluir/:id', (req, res) => {

    db.query(
        'DELETE FROM clientes WHERE id = ?',
        [req.params.id],
        (err) => {

            if (err) {
                console.log(err);
                return res.send('Erro ao excluir cliente');
            }

            res.redirect('/clientes');
        }
    );

});


// =========================
// PRODUTOS
// =========================

// LISTAR PRODUTOS
app.get('/produtos', (req, res) => {

    db.query(
        'SELECT * FROM produtos',
        (err, produtos) => {

            if (err) {
                console.log(err);
                return res.send('Erro ao carregar produtos');
            }

            res.render('produtos', { produtos });
        }
    );

});

// CADASTRAR PRODUTO
app.post('/produtos', (req, res) => {

    const { nome, preco } = req.body;

    db.query(
        'INSERT INTO produtos (nome, preco) VALUES (?, ?)',
        [nome, preco],
        (err) => {

            if (err) {
                console.log(err);
                return res.send('Erro ao cadastrar produto');
            }

            res.redirect('/produtos');
        }
    );

});

// EXCLUIR PRODUTO
app.get('/produtos/excluir/:id', (req, res) => {

    db.query(
        'DELETE FROM produtos WHERE id = ?',
        [req.params.id],
        (err) => {

            if (err) {
                console.log(err);
                return res.send('Erro ao excluir produto');
            }

            res.redirect('/produtos');
        }
    );

});


// =========================
// VENDAS
// =========================

// LISTAR VENDAS
app.get('/vendas', (req, res) => {

    db.query(
        'SELECT * FROM vendas',
        (err, vendas) => {

            if (err) {
                console.log(err);
                return res.send('Erro ao carregar vendas');
            }

            res.render('vendas', { vendas });
        }
    );

});

// CADASTRAR VENDA
app.post('/vendas', (req, res) => {

    const { cliente, produto, quantidade } = req.body;

    db.query(
        'INSERT INTO vendas (cliente, produto, quantidade) VALUES (?, ?, ?)',
        [cliente, produto, quantidade],
        (err) => {

            if (err) {
                console.log(err);
                return res.send('Erro ao registrar venda');
            }

            res.redirect('/vendas');
        }
    );

});

// EXCLUIR VENDA
app.get('/vendas/excluir/:id', (req, res) => {

    db.query(
        'DELETE FROM vendas WHERE id = ?',
        [req.params.id],
        (err) => {

            if (err) {
                console.log(err);
                return res.send('Erro ao excluir venda');
            }

            res.redirect('/vendas');
        }
    );

});


// TESTE DE CONEXÃO COM BANCO
app.get('/teste-banco', (req, res) => {

    db.query(
        'SELECT * FROM clientes',
        (err, resultado) => {

            if (err) {
                return res.send(err.message);
            }

            res.json(resultado);
        }
    );

});


// INICIAR SERVIDOR
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});