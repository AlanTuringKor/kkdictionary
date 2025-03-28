import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) return setSuggestions([]);

      try {
        const res = await fetch(`http://localhost:4000/api/autocomplete?query=${query}`);
        const data = await res.json();
        setSuggestions(data);
        setHighlightedIndex(-1);
      } catch (err) {
        console.error('자동완성 에러:', err);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 200);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await fetch('http://localhost:4000/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate('/result', { state: { result: data } });
      } else {
        navigate('/error', { state: { query } });
      }
    } catch (err) {
      navigate('/error', { state: { query } });
    }
  };

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
        break;
      case 'Enter':
        if (highlightedIndex >= 0) {
          e.preventDefault();
          setQuery(suggestions[highlightedIndex]);
          setSuggestions([]);
          setHighlightedIndex(-1);
          setTimeout(() => {
            document.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
          }, 0);
        }
        break;
      case 'Escape':
        setSuggestions([]);
        break;
      default:
        break;
    }
  };

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
                  setSuggestions([]);
                  setTimeout(() => {
                    document.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
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
