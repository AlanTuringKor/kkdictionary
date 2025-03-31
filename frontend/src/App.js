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
import './App.css';

function App() {
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
