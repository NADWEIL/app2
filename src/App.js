// src/App.js
import React from 'react';
import TimersManager from './TimersManager';
import { useTheme } from './ThemeContext';
import './App.css';

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <h1>Gestionnaire de Minuteurs</h1>
      <button onClick={toggleTheme} className="theme-toggle-button">
        {theme === 'light' ? '🌚' : '🌞'}
      </button>
      <TimersManager />
    </div>
  );
};

export default App;

