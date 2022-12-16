const express = require('express');
const router = express.Router();
const {addExcel , getExcel} = require('../controller/excelController');

//admin
router.post('/addExcel',addExcel)
router.get('/getExcel',getExcel)


module.exports = router;