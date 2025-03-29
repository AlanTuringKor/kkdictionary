import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PopularSidebar() {
  const [popularWords, setPopularWords] = useState([]);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || '/api';

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await fetch(`${API_URL}/popular`);
        const contentType = res.headers.get('content-type');

        if (!contentType || !contentType.includes('application/json')) {
          const text = await res.text();
          console.error('⚠️ JSON 아님. 받은 데이터:', text);
          throw new Error('응답이 JSON이 아닙니다');
        }

        const data = await res.json();
        setPopularWords(data);
      } catch (err) {
        console.error('🔥 인기 단어 불러오기 에러:', err);
      }
    };

    fetchPopular();
  }, []);

  const handleClick = async (word) => {
    try {
      const res = await fetch(`${API_URL}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: word }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate('/result', { state: { result: data } });
      } else {
        navigate('/error', { state: { query: word } });
      }
    } catch (err) {
      console.error('❌ 검색 요청 실패:', err);
      navigate('/error', { state: { query: word } });
    }
  };

  return (
    <div className="popular-sidebar">
      <h3>🔥 인기 단어</h3>
      <ul>
        {popularWords.map(({ word }) => (
          <li
            key={word}
            onClick={() => handleClick(word)}
            style={{ cursor: 'pointer' }}
          >
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PopularSidebar;
