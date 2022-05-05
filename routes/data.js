const express = require('express');
const router = express.Router();
const indexPage = require('../controllers/index.js');

router.get('/', indexPage.index); 

router.get('/searchDataCategory',indexPage.searchDataCategory);

router.route('/searchData')
    .get(indexPage.searchDataForm)
    .post(indexPage.filteredResult)

router.get('/exportCSV',indexPage.exportCSV);

module.exports = router;