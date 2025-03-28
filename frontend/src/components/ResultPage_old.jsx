import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { result } = state || {};

  return (
    <div className="result-page">
      <a onClick={() => navigate('/')}>ㅋㅋ백과</a>
      <h2>{result.word}</h2>
      <p><strong>정의:</strong> {result.definition}</p>
      <p><strong>사용 예:</strong> {result.usage}</p>
      <p><strong>관련 단어:</strong> {result.related.join(', ')}</p>
    </div>
  );
}

export default ResultPage;
