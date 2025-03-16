import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './UserStatistics.css';

type GameResult = 'win' | 'loss'; 

type UserStatisticsProps = {
    totalGames: number;
    wonGames: number;
    recentResults: GameResult[];
};

const UserStatistics: React.FC<UserStatisticsProps> = ({ totalGames, wonGames, recentResults }) => {
  const winPercentage = totalGames > 0 ? Math.round((wonGames / totalGames) * 100) : 0;

  const cumulativeData = recentResults.map((result, index) => ({
      gameNumber: index + 1,
      cumulativeWins: recentResults.slice(0, index+1).filter(r => r === 'win').length
  }));

  return (
    <div className="user-statistics">
      <h2>Game Statistics</h2>
      <div className="stats-container">
        {/* Text information */}
        <div className="stats-info">
          <p><strong>Total games:</strong> {totalGames}</p>
          <p><strong>Games won:</strong> {wonGames}</p>
          <p><strong>Win rate:</strong> {winPercentage}%</p>
        </div>
        {/* Chart */}
        <div className="chart-container">
          <LineChart width={500} height={300} data={cumulativeData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis 
            dataKey="gameNumber" 
            label={{ value: 'Game', position: 'insideBottomRight', offset: -5 }}
          />
         <YAxis 
            label={{ value: 'Wins', angle: -90, position: 'insideLeft' }} 
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cumulativeWins" stroke="#0088FE" />
        </LineChart>
        </div>
      </div>
    </div>
  );
};

export default UserStatistics;
