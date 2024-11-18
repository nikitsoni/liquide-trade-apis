const Trade = require('../models/TradeModel');

let tradeCounter = 1;

const createTrade = async (req, res) => {

    try {
        const { type, user_id, symbol, shares, price } = req.body;
        const trade = new Trade({ type, user_id, symbol, shares, price, id: tradeCounter++ });
        await trade.save();
        return res.status(201).json(trade);
    } catch (err) {
        return res.status(400).json({ message: "Could not execute the trade" });
    }
};

const getAllTrades = async (req, res) => {
    try {
        const { type, user_id, symbol, page = 1, limit = 10 } = req.query;
        const filter = {};

        if (type) filter.type = type;
        if (user_id) filter.user_id = user_id;
        if (symbol) filter.symbol = symbol;

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        const trades = await Trade.find(filter)
            .sort({ id: 1 })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);
        
        const total = await Trade.countDocuments(filter);
        
        res.status(200).json({
            trades,
            pagination: {
            total,
            page: pageNumber,
            pages: Math.ceil(total / limitNumber),
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving trades", error }); 
    }
};

const getTradeById = async (req, res) => {

    try {

        const { id } = req.params;
        const trade = await Trade.findById(id);

        if (!trade) {
            return res.status(404).json({ message: "Trade not found" });
        }

        res.status(200).json(trade);
        
    } catch (error) {
        res.status(500).json({ message: "Error retrieving trades", error });
    }
    
};

module.exports = { createTrade, getAllTrades, getTradeById };
