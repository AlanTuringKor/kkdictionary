import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSearchHandler from '../hooks/useSearchHandler';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    query, setQuery,
    suggestions, highlightedIndex,
    handleSearch, handleKeyDown,
    inputRef,
    result, setResult,
    setSuggestions
  } = useSearchHandler(navigate);

  useEffect(() => {
    const incoming = location.state?.result;
    // ✅ result를 항상 배열로 변환
    setResult(Array.isArray(incoming) ? incoming : incoming ? [incoming] : []);
  }, [location.state, setResult]);

  if (!result || result.length === 0) {
    return (
      <div className="result-page">
        <p>결과가 없습니다.</p>
        <button onClick={() => navigate('/')}>홈으로</button>
      </div>
    );
  }

  return (
    <div className="result-page">
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
          <ul className="suggestion-list" style={{ listStyle: 'none' }}>
            {suggestions.map((word, i) => (
              <li
                key={i}
                className={i === highlightedIndex ? 'highlighted' : ''}
                onClick={() => {
                  setQuery(word);
                  setSuggestions([]);
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

      {result.map((entry, idx) => (
        <div className="result-content" key={idx}>
          <h2 className="result-word">{entry.word}</h2>

          <div className="result-section">
            <h3>정의</h3>
            <p>{entry.description || '정의 없음'}</p>
          </div>

          <div className="result-section">
            <h3>사용 예</h3>
            {entry.examples?.length > 0 ? (
              <ul>
                {entry.examples.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            ) : (
              <p>예시가 아직 등록되지 않았습니다.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResultPage;
