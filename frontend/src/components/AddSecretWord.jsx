// src/pages/AddSecretWord.jsx
import { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function AddSecretWord() {
  const [word, setWord] = useState('');
  const [description, setDescription] = useState('');
  const [example, setExample] = useState('');
  const API_URL = process.env.REACT_APP_API_URL || '/api';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date();

    const data = {
      id: uuidv4().replace(/-/g, ''),
      word,
      definitions: [{ description, example: example ? [example] : [] }],
      author: null,
      liked_users: [],
      disliked_users: [],
      entry_time: currentDate,
      last_modified: currentDate,
      source_dictID: null
    };

    try {
      await axios.post(`${API_URL}/add`, data);
      alert('단어 추가 완료!');
      setWord('');
      setDescription('');
      setExample('');
    } catch (error) {
      console.error('에러 발생:', error);
      alert('단어 추가 실패');
    }
  };

  return (
    <div className="main-content welcome-page">
      <h2 className="text-3xl font-bold mb-4">🔥 ㅋㅋ백과 단어 추가 🔥</h2>
      <form onSubmit={handleSubmit} className="search-form" style={{ flexDirection: 'column' }}>
        <input
          type="text"
          placeholder="단어"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          required
          className="search-input"
        />
        <textarea
          placeholder="설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="search-input"
          rows="5"
        />
        <textarea
          placeholder="예시 (선택 사항)"
          value={example}
          onChange={(e) => setExample(e.target.value)}
          className="search-input"
          rows="3"
        />
        <button type="submit" className="search-button">추가하기</button>
      </form>
    </div>
  );
}

export default AddSecretWord;
