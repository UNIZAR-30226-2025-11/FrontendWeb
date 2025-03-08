import { useNavigate } from 'react-router-dom';
import { routes } from '../.constants';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>User profile</h1>
      <p>Welcome to your profile! Here you can view and modify your personal information.</p>
      <button
        onClick={() => navigate(routes.gamemenu)}
      >
        Back to menu
      </button>
    </div>
  );
};

export default Profile;
