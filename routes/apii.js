const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const user = require('../controllers/user');
const register = require('../controllers/register');
const complain = require('../controllers/names');
const customer = require('../controllers/Customer');
const store = require('../controllers/stores');
const stock = require('../controllers/stock');
const purch = require('../controllers/purchases');


router.post('/forgetpwd',user.mailverify);
router.get('/viewcuz' , customer.view);
router.get('/getitem',stock.view);
router.post('/complains', complain.addcomplain);
router.get('/viewstore' , store.view);
router.post('/addpurch', purch.addnewperch);
router.get('/viewcuz' , customer.view);
router.put('/edititem/:id',customer.updatedetails);

router.get('/getpurch',purch.view);
router.put('/editstore/:id',store.updatestoredetails);
router.get('/viewcompid' , complain.view);
router.put('/editcomp/:id',complain.updatedetailsllocation);
router.get('/Subarea/:subarea' , complain.subcomplains);
router.post('/email',complain.email);
router.post('/email1',complain.email1);
router.post('/checkWarranty/:serialnumber',complain.checkWarranty);

module.exports=router;