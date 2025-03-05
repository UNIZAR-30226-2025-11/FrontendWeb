import React from 'react';
import '../styles/WinLose.css';

const WinLose = ({ win, onRestart }) => {
  return (
    <div className="win-lose-container">
      {win ? (
        <div className="win-message">
          <h1>You won !</h1>
          <p>Congratulations, you've won the game!</p>
        </div>
      ) : (
        <div className="lose-message">
          <h1>You lost !</h1>
          <p>Too bad you didn't succeed this time.</p>
        </div>
      )}
      <button onClick={onRestart} className="restart-button">
        Play again
      </button>
    </div>
  );
};

export default WinLose;
