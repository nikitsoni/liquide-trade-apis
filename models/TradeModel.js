const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['buy', 'sell'] },
  user_id: { type: String, required: true },
  symbol: { type: String, required: true },
  shares: { type: Number, required: true, min: 1, max: 100 },
  price: { type: Number, required: true },
  timestamp: { type: Number, default: Date.now }
});

module.exports = mongoose.model('Trade', tradeSchema);
