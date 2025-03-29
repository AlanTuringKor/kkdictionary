const mongoose = require('mongoose');

const popularWordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  rank: { type: Number, required: true },
}, { collection: 'popular_words' }); // ✅ 명시적으로 컬렉션 이름 지정

module.exports = mongoose.model('PopularWord', popularWordSchema);
