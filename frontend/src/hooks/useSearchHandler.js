import { useState, useEffect, useRef } from 'react';

const useSearchHandler = (navigate, initialResult = null) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [result, setResult] = useState(initialResult);
  const inputRef = useRef();
  const API_URL = process.env.REACT_APP_API_URL || '/api';

  // 자동완성 요청
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) return setSuggestions([]);
      try {
        const res = await fetch(`${API_URL}/autocomplete?query=${query}`);
        const data = await res.json();
        const unique = [...new Set(data)];
        setSuggestions(unique);
        setHighlightedIndex(-1);
      } catch (err) {
        console.error('자동완성 에러:', err);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 200);
    return () => clearTimeout(debounce);
  }, [query]);

  // 검색 요청
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      const res = await fetch(`${API_URL}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(Array.isArray(data) ? data : [data]);
        setSuggestions([]);
        setQuery('');
        setHighlightedIndex(-1);
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
            document.querySelector('form').dispatchEvent(
              new Event('submit', { bubbles: true, cancelable: true })
            );
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

  return {
    query, setQuery,
    suggestions,
    highlightedIndex,
    handleSearch,
    handleKeyDown,
    inputRef,
    result, setResult
  };
};

export default useSearchHandler;
