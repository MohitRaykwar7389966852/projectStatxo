const express = require('express');
const router = express.Router();
const {addExcel , getExcel , editExcel} = require('../controller/excelController');

//admin
router.post('/addExcel',addExcel)
router.get('/getExcel',getExcel)
router.put('/editExcel/:editId',editExcel)


module.exports = router;