import React from 'react';
import UserStatistics from './Statistics';

const Profile: React.FC = () => {
  const totalGames = 50;
  const wonGames = 30;
  const recentResults: ('win' | 'loss')[] = ['win', 'loss', 'win', 'win', 'loss', 'loss', 'win', 'win', 'loss', 'win'];

  return (
    <div>
      <UserStatistics totalGames={totalGames} wonGames={wonGames} recentResults={recentResults} />
    </div>
  );
};

export default Profile;