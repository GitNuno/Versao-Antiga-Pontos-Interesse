// associar as dependências instaladas 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// LIGAÇÃO_BD_V_1 ----------------------------------------------------------------------------------
// // Ligar á B.D.: 'test'->nome da BD, ´nnn´->pass, 'nodejscluster'->nome do cluster
// mongoose.connect('mongodb+srv://test:nnn@nodejscluster-art2k.mongodb.net/test?retryWrites=true');
// mongoose.Promise = global.Promise;

// // Confirma ligação na consola
// mongoose.connection.on('connected', function () {
//     console.log('Connected to Database -> '+'test');
//   });
//   // Mensagem de Erro->Ex.'Sem Internet'
//   mongoose.connection.on('error', (err) => {
//     console.log('Database error -> '+err);
//   });

// // 'END POINT INVÁLIDO!'
// app.get('/', function(req, res){
//     res.send('END POINT INVÁLIDO!');
//   });
// FIM_LIGAÇÃO_BD_V_1 ----------------------------------------------------------------------------------


// Configuração da B.D.
const db = require('./config/database').mongoURI; // BD_REMOTA
// const db = require('./config/database').localURI; // BD_LOCAL
// Ligar a mongoDB
mongoose.connect(db,{ useNewUrlParser: true })
  .then(() => console.log('Ligado a mongoDB'))
  .catch(err => console.log(err));


// Configuração da view engine
app.set('view engine', 'ejs');


// MIDDLEWARE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// staticFiles-middleware
// Se pretender fazer um GET de uma imagem em 'localhost:5000/img.jpg' o pedido chega 
// e encontra este 1º middleware , verifica que é um ficheiro estático e serve esse ficheiro 
// a partir da pasta 'public/assets/img.jpg' .
app.use(express.static('./public'));

// este middleware deve estar acima das routes-handlers!
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// iniciar as rotas: todo o url começado por '/api' chama as rotas em './routes/api'
const routes = require('./routes/api');
app.use('/api', routes);

// error handling middleware
app.use(function(err, req, res, next){
    console.log(err);
    // res.send({error: err.message});
    // 'res.status(422)'->muda o status
    res.status(422).send({error: err.message});
});
// FIM_MIDDLEWARE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// rota raiz: renderiza a pagina onde criamos novo PI
app.get('/', function (req, res) {
  res.render('createPI');
});

// servidor á escuta no porto 5000 - 'process.env.port': caso usemos Heroku o porto é providenciado por eles
let port = 5001;
app.listen(process.env.port || port, () =>{
    console.log('Servidor em execução no porto: '+ port);
});


// NOTAS: \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// // como enviar um objeto json
// app.get('/api', function(req, res){
//   res.send({ name: 'Yoshi' });
// });