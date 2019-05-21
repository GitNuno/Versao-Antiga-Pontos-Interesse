

const express = require ('express');
const router = express.Router();

// importa controlador apiController.js na pasta: '../controllers/apiController'
const apiController = require('../controllers/apiController');

// url do teste será: http://localhost:5000/api/teste
router.get('/teste', apiController.test);

// criar novo ponto de interesse
router.post('/create',apiController.create);

// listar um pontos de interesse por id (para editar)
router.get('/edit/:id',apiController.edit);

// listar todos os pontos de interesse da BD
router.get('/listAll',apiController.listAll);

// detalhes dos pontos de interesse proximos da lng/lat introduzidas
router.get('/details',apiController.details);

// atualizar ponto de interesse
router.post('/update/:id',apiController.update);

// apagar ponto de interesse
router.get('/delete/:id',apiController.delete);


module.exports = router;

// TESTES ------------------------------------------------
// ROTA SEM CONTROLADOR ASSOCIADO
// router.get('/teste', function(req, res){
//     // res.send('Olá! Teste+++');
//     res.render('PI');
// });