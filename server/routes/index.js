const express = require('express');
const router = express.Router();

const commentRouter = require('./CommentsRoute');
const userRouter = require('./UsersRoute');
const adminRouter = require('./AdminRoute');
const productRouter = require('./ProductRoute');
const categoryRouter = require('./CategoryRoute');


router.use('/comments', commentRouter);
router.use('/users', userRouter);
router.use('/db-admin', adminRouter);
router.use('/product', productRouter);
router.use('/category', categoryRouter);

module.exports = router;