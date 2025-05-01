import React from 'react';
import { Tooltip, PieChart, Pie, Cell } from 'recharts';
import { UserContextType, useUser } from '../../context/UserContext';
import GlassCard from '../../common/GlassCard/GlassCard';
import { formatRelativeTime } from '../../utils/functions';

import './statistics.css';

const UserStatistics: React.FC = () => {
  const userContext: UserContextType = useUser();

  const gamesWon = userContext.user?.statistics.gamesWon || 0;
  const gamesPlayed = userContext.user?.statistics.gamesPlayed || 0;
  const gamesLost = gamesPlayed - gamesWon;
  const winPercentage = gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0;
  const totalTimePlayedSeconds = userContext.user?.statistics.totalTimePlayed || 0;
  const background: string = userContext.user?.userPersonalizeData.background || 'default'; // Default background if not set

  const totalTimePlayed:string = new Date(totalTimePlayedSeconds * 1000).toISOString().substr(11, 8); // Convert seconds to HH:MM:SS
  
  const totalTurnsPlayed = userContext.user?.statistics.totalTurnsPlayed || 0;

  const lastFiveGames = userContext.user?.statistics.lastFiveGames || [];

  console.log(lastFiveGames);

  // Calculate streak and best streak (dummy data - replace with actual data)
  const currentStreak = userContext.user?.statistics.currentStreak || 0;
  const bestStreak = userContext.user?.statistics.bestStreak || 0;

  // Pie chart data for win/loss ratio
  const pieData = [
    { name: 'Wins', value: gamesWon, color: '#36d1dc' },
    { name: 'Losses', value: gamesLost, color: '#ff6a88' }
  ];

  // Calculate total for percentage display
  const totalGames = gamesWon + gamesLost;
  const winPercentageFormatted = totalGames > 0 ? Math.round((gamesWon / totalGames) * 100) : 0;
  const lossPercentageFormatted = totalGames > 0 ? Math.round((gamesLost / totalGames) * 100) : 0;


  return (
    <GlassCard title='Game Statistics' minwidth={500} maxwidth={800} showPaws={false} animationDelay={100} background={background}>
 
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

      <div className="stats-card">
        <div className="stats-icon">🎲</div>
        <h3>Total Turns Played</h3>
        <div className="stats-value">{totalTurnsPlayed}</div>
      </div>

      </div>
    
    <div className="stats-container">
      <div className="stats-info">
        <h3 className="section-title">Current Status</h3>
        <p><span className="stats-emoji">🔥</span> <strong>Current streak:</strong> {currentStreak} games</p>
        <p><span className="stats-emoji">⭐</span> <strong>Best streak:</strong> {bestStreak} games</p>
        <p><span className="stats-emoji">⏱️</span> <strong>Average game time:</strong> {totalTimePlayed}</p>
      </div>
      
      <div className="chart-container">
        <h3 className="section-title">Win/Loss Ratio</h3>
        <PieChart width={240} height={240}>
          <Pie
            data={pieData}
            cx={120}
            cy={120}
            innerRadius={60}
            outerRadius={85}
            paddingAngle={5}
            dataKey="value"
            animationBegin={200}
            animationDuration={1500}
          >
            {pieData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color} 
                stroke="rgba(0,0,0,0.2)"
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name) => [`${value} games`, name]}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '8px',
              padding: '10px',
              border: 'none',
              color: '#333',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
            }}
          />
        </PieChart>
        
        <div className="chart-labels">
          <div className="chart-label">
            <span className="color-box win-color"></span> Wins ({winPercentageFormatted}%)
          </div>
          <div className="chart-label">
            <span className="color-box loss-color"></span> Losses ({lossPercentageFormatted}%)
          </div>
        </div>
      </div>
    </div>
    
    <div className="recent-activity">
      <h3 className="section-title">Recent Activity</h3>
      <div className="activity-timeline">
        {lastFiveGames.map((game, index) => (
          <div key={index} className={`activity-item ${game.isWinner ? 'win' : 'loss'}`}>
            <div className="activity-icon">{game.isWinner ? '✅' : '❌'}</div>
            <div className="activity-details">
              <p className="activity-title">{game.isWinner ? 'Victory' : 'Defeat'} in lobby {game.lobbyId}</p>
              <p className="activity-time">{formatRelativeTime(new Date(game.gameDate))}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

  </GlassCard>
        
  );
};

export default UserStatistics;