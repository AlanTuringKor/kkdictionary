import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSearchHandler from '../hooks/useSearchHandler';

function WelcomePage() {
  const navigate = useNavigate();
  const {
    query, setQuery,
    suggestions, highlightedIndex,
    handleSearch, handleKeyDown,
    inputRef
  } = useSearchHandler(navigate);

  return (
    <div className="welcome-page">
      <h1>ㅋㅋ백과</h1>
      <p>한국어 슬랭과 문화를 해독하는 열쇠</p>

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
    </div>
  );
}

export default WelcomePage;
