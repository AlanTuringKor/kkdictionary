import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ErrorPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const query = state?.query || '';

  return (
    <div className="error-page">
      <h1>앗!</h1>
      <p>"{query}"를 찾을 수 없습니다.</p>
      <a onClick={() => navigate('/')}>홈으로 돌아가기</a>
    </div>
  );
}

export default ErrorPage;
