const validateTrade = (req, res, next) => {
    
    console.log(req.body);
    
    const { type, user_id, symbol, shares, price } = req.body;

    if (!type || !user_id || !symbol || !shares || !price) {
        return res.status(400).json({message: "Missing required fields"});
    }

    if (shares < 1 || shares > 100) {
        return res.status(400).json({message: "Shares must be between 1 and 100"});
    }

    if (!['buy', 'sell'].includes(type)){
        return res.status(400).json({message: "Invalid trade type"});
    }

    next();
};

module.exports = validateTrade;