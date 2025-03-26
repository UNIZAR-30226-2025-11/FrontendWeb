import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './UserStatistics.css';
import { UserContextType, useUser } from '../../context/UserContext';


const UserStatistics: React.FC = () => {

  const userContext: UserContextType = useUser();

  const gamesWon = userContext.user?.games_won!;
  const gamesPlayed = userContext.user?.games_played!;


  const winPercentage = gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0;

  return (
    <div className="user-statistics">
      <h2>Game Statistics</h2>
      <div className="stats-container">
        {/* Text information */}
        <div className="stats-info">
          <p><strong>Total games:</strong> {gamesPlayed}</p>
          <p><strong>Games won:</strong> {gamesWon}</p>
          <p><strong>Win rate:</strong> {winPercentage}%</p>
        </div>
        {/* Chart */}
        {/* <div className="chart-container">
          <LineChart width={500} height={300} data={}>
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
        </div> */}
      </div>
    </div>
  );
};

export default UserStatistics;
