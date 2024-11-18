const express = require('express');
const validateTrade = require('../middlewares/tradeMiddleware');
const validateUser = require('../middlewares/authMiddleware');
const { createTrade, getAllTrades, getTradeById } = require('../controllers/tradeController');
const methodNotAllowed = require('../middlewares/invalidRouteMiddleware');

const router = express.Router();

router.post('/trades', validateUser, validateTrade, createTrade);
router.get('/trades', validateUser, getAllTrades);
router.get('/trades/:id', validateUser, getTradeById);

router.route('/trades/:id')
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .patch(methodNotAllowed);

module.exports = router;