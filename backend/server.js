const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // 추가
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// 라우터 설정
const dictRoutes = require('./routes/dictionary');
app.use('/api', dictRoutes);

const popularRoutes = require('./routes/popular');
app.use('/api/popular', popularRoutes); // ✅ 추가


// 🧾 프론트 정적 파일 제공 + SPA 라우팅 처리
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
