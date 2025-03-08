import '../styles/userbar.css';
import userIcon from '../../assets/Icon.png';
import coinsIcon from '../../assets/coins.png';

const UserBar = ({ username, coins }) => {
  return (
    <div className="user-bar">
      <div className="user-info">
        {/* User icon */}
        <img src={userIcon} alt="User Icon" className="user-icon" />
        {/* Display the username */}
        <span className="username">{username}</span>
      </div>
      <div className="coins-info">
        {/* Display the number of coins */}
        <span className="coins">{coins}</span>
        {/* Coins icon */}
        <img src={coinsIcon} alt="User coins" className="coins-icon" />
      </div>
    </div>
  );
};

export default UserBar;
