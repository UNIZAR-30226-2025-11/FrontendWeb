import PropTypes from "prop-types"
import userIcon from '../../assets/Icon.png';
import coinsIcon from '../../assets/coins.png';

import '../styles/userbar.css';

/**
 * Defines the HTML for create a user bar with the
 * name of the user and the coins he has.
 * 
 * @param {*} username The name of the user
 * @param {*} coins The number of coins he has.
 * 
 * @returns The user bar
 */
const UserBar = ({ username, coins }) => {
  return (
    <div className="user-bar">

      {/* User information */}
      <div className="user-info">
        {/* User icon */}
        <img src={userIcon} alt="User Icon" className="user-icon" />

        {/* Username */}
        <span className="username">{username}</span>
      </div>

      {/* Coins */}
      <div className="coins-info">

        {/* Number */}
        <span className="coins">{coins}</span>

        {/* Icon */}
        <img src={coinsIcon} alt="User coins" className="coins-icon" />
      </div>
    </div>
  );
};

/**
 * Define the properties that the parameters
 * of the components must have.
 */
UserBar.propTypes = {
  username: PropTypes.string.isRequired,
  coins: PropTypes.number.isRequired
}

export default UserBar;
