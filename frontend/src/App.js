import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import ResultPage from './components/ResultPage';
import ErrorPage from './components/ErrorPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Privacy from './components/Privacy';
import AboutPage from './components/AboutPage'; 
import PopularSidebar from './components/PopularSidebar';
import AddSecretWord from './components/AddSecretWord';
import './App.css';

function App() {
  const secretPath = process.env.REACT_APP_SECRET_PATH;
  console.log('🔥 환경변수 확인 🔥');
  console.log('API_URL:', process.env.REACT_APP_API_URL);
  console.log('SECRET_PATH:', process.env.REACT_APP_SECRET_PATH);

  return (
    <Router>
      <div className="app-container"> 
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path={`/${secretPath}`} element={<AddSecretWord />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
