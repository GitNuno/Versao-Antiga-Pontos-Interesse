// importar modelo
const PI = require('../models/PImodel');

// exporta f.teste, chamada em /routes/api.js
exports.test = function (req, res) {
    // res.send('Olá! Teste ao Controller');
    res.render('createPI');
};

// criar/adicionar novo ponto de interesse
// se ocorrido um erro, 'next' chama proximo middleware (ver 'app.js')
exports.create = function (req, res, next) {
    // cria novo 'pi' na BD a partir do request, depois, redirecciona para rota '/api/listall'
    PI.create(req.body).then(function(pi){
        console.log('Documento criado com sucesso!');
        res.redirect('/api/listall');
    }).catch(next);
};

// listar PIs baseado na distancia relativa aos valores de lng e lat 
// 'distanceField'->distancia calculada relativa á posição do cliente
// 'limit'->max. nº de documentos a devolver
module.exports.details = (req, res, next) =>{
    let lng = parseFloat(req.query.lng);
    let lat = parseFloat(req.query.lat);
    const maxDist = 100000;
    PI.aggregate([{
        '$geoNear': {
                'near': { 'type': 'Point', 
                'coordinates': [parseFloat(lng), parseFloat(lat)] },
                'spherical': true, 
                'distanceField': 'dist',
                'limit': 3,
                'maxDistance': maxDist
                    }
                }])
                .then(pi => res.render('listPIs', {pis: pi}))
                .catch(next);
};

// listar um ponto de interesse por id (para editar)
exports.edit = function (req, res, next) {
    PI.findOne({_id: req.params.id}).then(function(pi){
        res.render('editPI', {pi: pi});
    }).catch(next);
};

// atualiza 'pi' da BD com os valores do formulario
exports.update = function (req, res, next) {
        PI.findOneAndUpdate({_id: req.params.id}, req.body).then(function(){
            res.redirect('/api/listall');
    }).catch(next);
};

// listar todos os pontos de interesse da BD
exports.listAll = function (req, res, next) {
    PI.find({}).then(function(pi){
        // res.send('Rota Listall a funcionar!');
        // res.send(pi);
        res.render('listPIs', {pis: pi});
    }).catch(next);
};

// NINJA-11 min.03.00
// apaga 'pi' da BD, depois, redirecciona para '/api/listall'
exports.delete = function (req, res, next) {
     // '_id:'->nome da propriedade na BD, 'req.params.id'->devolve-me o parametro id na req
    PI.findOneAndDelete({_id: req.params.id}).then(function(pi){
        // res.send(pi);
        console.log("Registo eliminado com sucesso!");
        res.redirect('/api/listall');
    }).catch(next);
};









// NOTAS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// // CREATE_V1 +++
// // criar/adicionar novo ponto de interesse
// // se ocorrido um erro, 'next' chama proximo middleware (ver 'app.js')
// exports.create = function (req, res, next) {
//     // cria novo 'pi' na BD a partir do request, depois, devolve o 'pi' criado ao cliente
//     PI.create(req.body).then(function(pi){
//         res.send(pi);
//     }).catch(next);
// };
// TESTES CREATE_V1
// console.log('BODY: '+req.body.name);
// console.log('BODY: '+req.body.lat);
// console.log('Hello da rota "api/interest"...');

// // CREATE_V2 +++
// // criar/adicionar novo ponto de interesse
// // se ocorrido um erro, 'next' chama proximo middleware (ver 'app.js')
// exports.create = function (req, res, next) {
//     // inicializar variaveis com os valores do 'req.body'
//     let nm = req.body.name;
//     let dt = req.body.details;
//     let lng = req.body.lng;
//     let lat = req.body.lat;
//     // criar variavel baseada no modelo 'PImodel' para receber dados do formulario (request)
//     let data = {
//         name: nm,
//         details: dt,
//         status: true,
//         geometry: {"type": "point", "coordinates": [lng, lat]}
//     };
//     // cria novo 'pi' na BD a partir do request, depois, redirecciona para rota '/api/listall'
//     PI.create(data).then(function(pi){
//         console.log('Documento criado com sucesso!');
//         res.redirect('/api/listall');
//     }).catch(next);
// };

// // listAllPIs_V1 +++
// exports.listAllPIs = function (req, res) {
//     PI.find({}).then(function(pi){
//         res.send(pi);
//     });
// };

// DETAILS_V1 +++
// listar PIs baseado na distancia relativa aos valores de lng e lat 
// 'distanceField'->distancia calculada relativa á posição do cliente
// 'limit'->max. nº de documentos a devolver
// module.exports.details = (req, res, next) =>{
//     let lng = parseFloat(req.query.lng);
//     let lat = parseFloat(req.query.lat);
//     const maxDist = 100000;
//     PI.aggregate([{   
//         '$geoNear': {
//                 'near': { 'type': 'Point', 
//                 'coordinates': [parseFloat(lng), parseFloat(lat)] },
//                 'spherical': true, 
//                 'distanceField': 'dist',
//                 'limit': 3,
//                 'maxDistance': maxDist
//                     }
//                 }])
//                 .then(pi => res.send(pi))
//                 .catch(next); 
//                 // testes
//                 console.log(req.query);
//                 console.log(req.query.lng);   
// };


// UPDATE_V1
// // NINJA-12 min.02.00
// // atualiza 'pi' da BD com as propriedades de 'req.body'
// // depois, procura de novo na BD o 'pi' atualizado (senão manda o pi não atualizado!)
// // depois, devolve o 'pi' atualizado ao cliente 
// exports.update = function (req, res, next) {
//     PI.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
//         PI.findOne({_id: req.params.id}).then(function(pi){
//             res.send(pi);
//         });
//     }).catch(next);
// };


// SOL. nearSphere (NÃO DEVOLVE DISTANCIA, NEM LIMITA RESPOSTA)
// module.exports.details = (req, res, next) =>{
//     const { lng, lat } = req.query;
//     PI.find({
//       'geometry.coordinates': {
//         $nearSphere: {
//           $geometry: {
//             type: 'Point',
//             coordinates:[parseFloat(lng), parseFloat(lat)],
//           },
//           $maxDistance: 1000000
//         },
//       }
//     })
//     .then(pi => res.send(pi))
//     .catch(next);
//   };

// TOTAL DOCS NA BD
// PI.count({}, function(err, count){
//     console.log( "Number of docs: ", count );

// CONTAR N. ELTS JSON v_1
// ...
// }).then(function(pi){
//     var count = 0;
//     for (var key in pi) {
//       if (key) {
//        count++;
//       }
//     }
//     console.log(count);
//     res.send(pi);
// }).catch(next);
// };

// function length(obj) {
//     return Object.keys(obj).length;
// }

// CONTAR N. ELTS JSON v_2
// length (data); // returns 1
// length (data.name_data) // returns 4