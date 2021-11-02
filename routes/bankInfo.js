const express = require('express');
const morgan = require('morgan');
const {getBankInfo} = require('../controllers/getBankInfo');
const {getFiscalInfo} = require('../controllers/getFiscalInfo');


const router = express();

router.use(express.json()) // for parsing application/json
router.use(morgan('combined'));


//Ruta Principal de Usuarios -> Pendiente 
router.post('/bank', getBankInfo);
router.post('/fiscal', getFiscalInfo);


module.exports = router;