const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Mongoose 스키마
const dictionarySchema = new mongoose.Schema({
  word: String,
  definitions: [
    {
      description: String,
      example: [String]
    }
  ]
}, { collection: 'dictionaries' }); // 명시적으로 컬렉션 지정

const Dictionary = mongoose.model('Dictionary', dictionarySchema);

// 🔍 자동완성 API
router.get('/autocomplete', async (req, res) => {
  const query = req.query.query || '';
  try {
    const words = await Dictionary.find({
      word: { $regex: '^' + query, $options: 'i' }
    })
    .limit(10)
    .select('word -_id');

    const result = words.map(w => w.word);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Server error in autocomplete' });
  }
});

// 🔎 검색 API
router.post('/search', async (req, res) => {
  const { query } = req.body;
  try {
    const entry = await Dictionary.findOne({ word: query });

    if (!entry) {
      return res.status(404).json({ error: '단어를 찾을 수 없습니다.' });
    }

    const definition = entry.definitions?.[0]?.description?.trim() || '설명이 아직 등록되지 않았습니다.';
    const examples = entry.definitions?.[0]?.example?.length
      ? entry.definitions[0].example
      : ['예시가 아직 등록되지 않았습니다.'];

    res.json({
      word: entry.word,
      description: definition,
      examples
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error in search' });
  }
});

module.exports = router;
