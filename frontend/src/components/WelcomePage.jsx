import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSearchHandler from '../hooks/useSearchHandler';


function WelcomePage() {
  const API_URL = process.env.REACT_APP_API_URL || '/api';
  const navigate = useNavigate();
  const {
    query, setQuery,
    suggestions, highlightedIndex,
    handleSearch, handleKeyDown,
    inputRef
  } = useSearchHandler(navigate);

  const [randomWords, setRandomWords] = useState([]);

  useEffect(() => {
    const fetchRandomWords = async () => {
      try {
        const res = await fetch(`${API_URL}/random`);
        const data = await res.json();
        setRandomWords(data);
      } catch (err) {
        console.error('🔥 랜덤 단어 불러오기 실패:', err);
      }
    };
    fetchRandomWords();
  }, []);

  return (
    <div className="welcome-page">
      <h1 className="main-title">ㅋㅋ백과</h1>
      <p className="subtitle">한국어 슬랭과 문화를 해독하는 열쇠</p>

      <div className="suggestion-wrapper">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="단어를 검색하세요..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-input"
            ref={inputRef}
          />
          <button type="submit" className="search-button">검색</button>
        </form>

        {suggestions.length > 0 && (
          <ul className="suggestion-list">
            {suggestions.map((word, i) => (
              <li
                key={i}
                className={i === highlightedIndex ? 'highlighted' : ''}
                onClick={() => {
                  setQuery(word);
                  setTimeout(() => {
                    document.querySelector('form').dispatchEvent(
                      new Event('submit', { bubbles: true, cancelable: true })
                    );
                  }, 0);
                }}
              >
                {word}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ✅ 추천 카드 영역 */}
      <div className="card-grid">
        {randomWords.map((item, index) => (
          <div
            key={index}
            className="word-card"
            onClick={() => navigate('/result', { state: { result: [item] } })}
          >
            <h3 className="word">{item.word}</h3>
            <p className="description">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WelcomePage;
