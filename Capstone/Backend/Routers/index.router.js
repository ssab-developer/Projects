const express = require("express");
const router = express.Router();

const authRouter = require('./auth.router');
const categoryRouter = require('./category.router')
const adminIndexRouter = require('./admin/index.router')
const productRouter =  require('./product.router')

router.use('/', authRouter);
router.use('/category', categoryRouter);
router.use('/admin', adminIndexRouter);
router.use('/product', productRouter);

module.exports = router; 