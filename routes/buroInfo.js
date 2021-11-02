const express = require('express');
const morgan = require('morgan');
const {getBuroInfo} = require('../controllers/getBuroInfo');


const router = express();

router.use(express.json()) // for parsing application/json
router.use(morgan('combined'));


//Ruta Principal de Usuarios -> Pendiente 
router.post('/', getBuroInfo);


module.exports = router;