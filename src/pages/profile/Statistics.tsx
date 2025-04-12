import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import './UserStatistics.css';
import { UserContextType, useUser } from '../../context/UserContext';
import GlassCard from '../../common/GlassCard/GlassCard';

const UserStatistics: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const userContext: UserContextType = useUser();

  const gamesWon = userContext.user?.games_won || 0;
  const gamesPlayed = userContext.user?.games_played || 0;
  const gamesLost = gamesPlayed - gamesWon;
  const winPercentage = gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0;
  
  // Calculate streak and best streak (dummy data - replace with actual data)
  const currentStreak = 3;
  const bestStreak = 7;

  // Pie chart data for win/loss ratio
  const pieData = [
    { name: 'Wins', value: gamesWon, color: '#36d1dc' },
    { name: 'Losses', value: gamesLost, color: '#ff6a88' }
  ];

  // Get achievement status based on wins
  const getAchievementStatus = () => {
    if (gamesWon >= 50) return { emoji: '🏆', text: 'Champion', progress: 100 };
    if (gamesWon >= 25) return { emoji: '🥇', text: 'Expert', progress: 50 };
    if (gamesWon >= 10) return { emoji: '🥈', text: 'Intermediate', progress: 25 };
    return { emoji: '🥉', text: 'Beginner', progress: 10 };
  };

  const achievement = getAchievementStatus();

  useEffect(() => {
    // Set visible after component mounts for animation
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  return (
    <GlassCard title='Game Statistics' minwidth={500} maxwidth={800} showPaws={false} animationDelay={100}>
 
    <div className="stats-grid">
      <div className="stats-card">
        <div className="stats-icon">🎮</div>
        <h3>Total Games</h3>
        <div className="stats-value">{gamesPlayed}</div>
      </div>
        
      <div className="stats-card">
        <div className="stats-icon">🏅</div>
        <h3>Games Won</h3>
        <div className="stats-value">{gamesWon}</div>
      </div>
      
      <div className="stats-card">
        <div className="stats-icon">📊</div>
          <h3>Win Rate</h3>
          <div className="stats-value">{winPercentage}%</div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${winPercentage}%` }}></div>
          </div>
        </div>
      </div>
    
    <div className="stats-container">
      <div className="stats-info">
        <h3 className="section-title">Current Status</h3>
        <p><span className="stats-emoji">🔥</span> <strong>Current streak:</strong> {currentStreak} games</p>
        <p><span className="stats-emoji">⭐</span> <strong>Best streak:</strong> {bestStreak} games</p>
        <p><span className="stats-emoji">⏱️</span> <strong>Average game time:</strong> 5m 30s</p>
        
        <div className="achievement-section">
          <h3 className="section-title">Achievement Level</h3>
          <div className="achievement-badge">
            <span className="achievement-emoji">{achievement.emoji}</span>
            <span className="achievement-text">{achievement.text}</span>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${achievement.progress}%` }}></div>
          </div>
          <p className="achievement-hint">Win more games to level up!</p>
        </div>
      </div>
      
      <div className="chart-container">
        <h3 className="section-title">Win/Loss Ratio</h3>
        <PieChart width={200} height={200}>
          <Pie
            data={pieData}
            cx={100}
            cy={100}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
        <div className="chart-labels">
          <div className="chart-label">
            <span className="color-box win-color"></span> Wins
          </div>
          <div className="chart-label">
            <span className="color-box loss-color"></span> Losses
          </div>
        </div>
      </div>
    </div>
    
    <div className="recent-activity">
      <h3 className="section-title">Recent Activity</h3>
      <div className="activity-timeline">
        <div className="activity-item win">
          <div className="activity-icon">✅</div>
          <div className="activity-details">
            <p className="activity-title">Victory against Player2</p>
            <p className="activity-time">2 hours ago</p>
          </div>
        </div>
        <div className="activity-item loss">
          <div className="activity-icon">❌</div>
          <div className="activity-details">
            <p className="activity-title">Loss against Player3</p>
            <p className="activity-time">Yesterday</p>
          </div>
        </div>
        <div className="activity-item win">
          <div className="activity-icon">✅</div>
          <div className="activity-details">
            <p className="activity-title">Victory against Player1</p>
            <p className="activity-time">3 days ago</p>
          </div>
        </div>
      </div>
    </div>

  </GlassCard>
        
  );
};

export default UserStatistics;