import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">ㅋㅋ백과</Link>
        </div>
        <nav className="nav">
          <ul>
            <li><Link to="/">홈</Link></li>
            <li><Link to="/about">소개</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
