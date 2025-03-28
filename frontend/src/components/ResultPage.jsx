import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [result, setResult] = useState(null);
  const inputRef = useRef();
  const API_URL = process.env.REACT_APP_API_URL || '/api';


  useEffect(() => {
    if (location.state?.result) {
      setResult(location.state.result);
    }
  }, [location.state]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const response = await fetch(`${API_URL}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        setSuggestions([]);
        setQuery('');
        setHighlightedIndex(-1);
      } else {
        navigate('/error', { state: { query } });
      }
    } catch (err) {
      navigate('/error', { state: { query } });
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) return setSuggestions([]);

      try {
        const res = await fetch(`${API_URL}/autocomplete?query=${query}`);
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

  if (!result) {
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

      <div className="result-content">
        <h2 className="result-word">{result.word}</h2>

        <div className="result-section">
          <h3>정의</h3>
          <p>{result.description}</p>
        </div>

        <div className="result-section">
          <h3>사용 예</h3>
          <ul>
            {result.examples.map((ex, i) => (
              <li key={i}>{ex}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
