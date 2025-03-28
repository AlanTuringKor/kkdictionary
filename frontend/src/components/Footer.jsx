import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} ㅋㅋ백과. 무단 전재 및 재배포 금지</p>
        <Link to="/privacy">개인정보 처리방침</Link>
      </div>
    </footer>
  );
}

export default Footer;
