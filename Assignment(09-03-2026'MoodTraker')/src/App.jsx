import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentMood, setCurrentMood] = useState('neutral');
  const [moodHistory, setMoodHistory] = useState([]);

  const moods = [
    { id: 'happy', emoji: '😊', label: 'Happy', color: '#FFD700', bgColor: '#FFF9C4' },
    { id: 'sad', emoji: '😢', label: 'Sad', color: '#4169E1', bgColor: '#E3F2FD' },
    { id: 'excited', emoji: '🎉', label: 'Excited', color: '#FF6B6B', bgColor: '#FFE0E0' },
    { id: 'calm', emoji: '😌', label: 'Calm', color: '#98D8C8', bgColor: '#E0F2F1' },
    { id: 'angry', emoji: '😠', label: 'Angry', color: '#DC143C', bgColor: '#FFEBEE' },
    { id: 'neutral', emoji: '😐', label: 'Neutral', color: '#9E9E9E', bgColor: '#F5F5F5' },
  ];

  const handleMoodSelect = (mood) => {
    setCurrentMood(mood.id);
    setMoodHistory([{ 
      mood: mood.id, 
      timestamp: new Date().toLocaleTimeString(),
      emoji: mood.emoji,
      label: mood.label
    }, ...moodHistory].slice(0, 8));
  };

  const currentMoodData = moods.find(m => m.id === currentMood);

  return (
    <div className="app-container" style={{ backgroundColor: currentMoodData.bgColor }}>
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1>🌈 Mood Tracker</h1>
          <p>How are you feeling today?</p>
        </div>
      </header>

      {/* Main Content - Full Screen */}
      <main className="app-main">
        <div className="main-grid">
          {/* Left Side - Current Mood */}
          <div className="current-mood-section">
            <div className="mood-card" style={{ borderColor: currentMoodData.color }}>
              <div className="mood-emoji-display">{currentMoodData.emoji}</div>
              <h2 className="mood-name" style={{ color: currentMoodData.color }}>
                {currentMoodData.label}
              </h2>
              <p className="mood-label-text">Current Mood</p>
              
              {/* Quick Stats */}
              <div className="mood-stats">
                <div className="stat-box">
                  <span className="stat-number">{moodHistory.length}</span>
                  <span className="stat-text">Updates</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">
                    {moodHistory.length > 0 ? moodHistory[0].emoji : '😐'}
                  </span>
                  <span className="stat-text">Latest</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Controls */}
          <div className="controls-section">
            {/* Mood Selector */}
            <div className="controls-card">
              <h3 className="section-heading">
                <span>🎯</span> Select Mood
              </h3>
              <div className="mood-buttons-grid">
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => handleMoodSelect(mood)}
                    className={`mood-btn ${currentMood === mood.id ? 'active' : ''}`}
                    style={{
                      backgroundColor: mood.bgColor,
                      borderColor: currentMood === mood.id ? mood.color : 'transparent',
                    }}
                  >
                    <span className="btn-emoji">{mood.emoji}</span>
                    <span className="btn-label">{mood.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* History Section */}
            {moodHistory.length > 0 && (
              <div className="history-card">
                <h3 className="section-heading">
                  <span>📊</span> Recent Moods
                </h3>
                <div className="history-list">
                  {moodHistory.map((entry, index) => (
                    <div key={index} className="history-item">
                      <div className="history-item-content">
                        <span className="history-emoji">{entry.emoji}</span>
                        <span className="history-mood">{entry.label}</span>
                        <span className="history-time">{entry.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips Section */}
            <div className="tips-card">
              <h3 className="section-heading">
                <span>💡</span> Quick Tips
              </h3>
              <div className="tips-list">
                <p>✨ Track daily to see patterns</p>
                <p>🌈 Colors represent emotions</p>
                <p>📱 History saves for session</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;