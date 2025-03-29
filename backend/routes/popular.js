const express = require('express');
const router = express.Router();
const PopularWord = require('../models/popularWordModel');

// 인기 단어 목록 조회
router.get('/', async (req, res) => {
  try {
    const words = await PopularWord.find().sort({ rank: 1 }).limit(10);
    res.json(words);
    
  } catch (err) {
    console.error('🔥 인기 단어 조회 오류:', err);
    res.status(500).json({ error: 'Failed to fetch popular words' });
  }
});

module.exports = router;
