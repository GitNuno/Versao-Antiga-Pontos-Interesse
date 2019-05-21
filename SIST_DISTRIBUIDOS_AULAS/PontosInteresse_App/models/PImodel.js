const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// NINJA-13 min.04.00
// geolocation Schema
// '2dsphere'->o mapa a usar tem em consideração a curvatura da Terra
const GeoSchema = new Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
});

// PI Schema
const PISchema = new Schema({
    name: {
        type: String,
        required: [true, '*Campo obrigatório!']
    },
    details: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    geometry: GeoSchema
});

// criar Modelo_PI baseado em PISchema: 'PontosInteresse'->nome da coleção
const PI = mongoose.model('PontosInteresse', PISchema);
// exportar Modelo (usado em /controllers/apiController.js)
module.exports = PI;

// NOTAS: qd faço: 'mongoose.model('PontosInteresse', PISchema)'
// ao criar novo ponto de interesse na rota ref. via 'router.post('/interest',apiController.create)'
// estou a criar tb uma coleção na BD de nome 'PontosInteresse' 