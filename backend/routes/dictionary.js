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
  if (!query) return res.status(400).json({ error: 'No query provided' });

  try {
    const entries = await Dictionary.find({ word: query });

    if (!entries || entries.length === 0) {
      return res.status(404).json({ error: 'No result found' });
    }

    // ✅ 결과는 전부 반환
    const results = entries.map((entry) => {
      const def = entry.definitions?.[0];
      return {
        word: entry.word,
        description: def?.description || '정의 없음',
        examples: def?.example?.length ? def.example : ['예시 없음'],
      };
    });
    res.json(results);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Search error' });
  }
});

module.exports = router;
