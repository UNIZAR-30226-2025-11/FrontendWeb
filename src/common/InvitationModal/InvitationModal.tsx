import React, { useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import './InvitationModal.css';
import { IMAGES_EXTENSION, IMAGES_PATH } from '../../services/apiShop';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/constants';

const InvitationModal: React.FC = () => {
  const { friendJoinRequest, 
    acceptInvitation, 
    declineInvitation, 
    canReconnect, 
    setCanReconnect, 
    leaveGame,
    setUndefined 
  } = useSocket();
  const navigate = useNavigate();


  const handleAccept = () => {
    if (friendJoinRequest) {
      navigate(routes.game); // Redirect to game after accepting invitation
      acceptInvitation(friendJoinRequest.lobbyId);
    }
  }

  const handleDecline = () => {
    if (friendJoinRequest) {
      declineInvitation(friendJoinRequest.lobbyId);
    }
  }

  const handleOkReconnect = () => {
    if (canReconnect) {
      navigate(routes.game);
      setCanReconnect(undefined); // Reset reconnect state after navigating
    }
  }

  const handleNoReconnect = () => {
    if (canReconnect) {
      leaveGame(canReconnect.lobbyId); // Leave the game if declining reconnect
      setCanReconnect(undefined); // Reset reconnect state
      setUndefined();
    }
  }

  // Auto-decline invitation after 10 seconds
  useEffect(() => {
    if (!friendJoinRequest) return;

    const timer = setTimeout(() => {
      if (friendJoinRequest) {
        declineInvitation(friendJoinRequest.lobbyId);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [friendJoinRequest, declineInvitation]);

  // Auto-reconnect to game after 10 seconds
  useEffect(() => {
    if (!canReconnect || friendJoinRequest) return;

    if(window.location.pathname === routes.game) return; // Don't auto-decline if already in game
    
    const timer = setTimeout(() => {
      handleOkReconnect();
    }, 10000);

    return () => clearTimeout(timer);
  }, [canReconnect, navigate, friendJoinRequest]);

  // Don't show if no modal condition is met
  if (!friendJoinRequest && !canReconnect) return null;
  
  // Prioritize friend invitation over reconnect
  if (friendJoinRequest) {
    return (
      <div className="invitation-modal-overlay">
        <div className="invitation-modal">
          <div className="invitation-modal-header">
            <h3>Lobby Invitation</h3>
          </div>
          <div className="invitation-modal-body">
            {friendJoinRequest.friendSendingRequestAvatar && (
              <img 
                src={`${IMAGES_PATH}/avatar/${friendJoinRequest.friendSendingRequestAvatar}${IMAGES_EXTENSION}`} 
                alt={`${friendJoinRequest.friendSendingRequest}'s avatar`} 
                className="invitation-friend-avatar"
              />
            )}
            <p><strong>{friendJoinRequest.friendSendingRequest}</strong> has invited you to join their lobby</p>
            <div className="lobby-details">Lobby ID: {friendJoinRequest.lobbyId}</div>
          </div>
          <div className="invitation-modal-footer">
            <button 
              className="invitation-btn decline"
              onClick={() => handleDecline()}
            >
              Decline
            </button>
            <button 
              className="invitation-btn accept"
              onClick={() => handleAccept()}
            >
              Accept
            </button>
          </div>
          <div className="invitation-timer">
            <div className="invitation-timer-bar"></div>
          </div>
          <div className="invitation-timer-info">Auto-declining in 10 seconds</div>
        </div>
      </div>
    );
  }

  if (window.location.pathname === routes.game) return null; // Don't show reconnect modal if already in game

  // Reconnect to game modal
  return (
    <div className="invitation-modal-overlay">
      <div className="invitation-modal">
        <div className="invitation-modal-header">
          <h3>Game in Progress</h3>
        </div>
        <div className="invitation-modal-body reconnect">
          <div className="reconnect-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" width="50" height="50">
            <path d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 248c-22.1 0-40-17.9-40-40s17.9-40 40-40s40 17.9 40 40s-17.9 40-40 40zm-24 56c0 22.1-17.9 40-40 40s-40-17.9-40-40s17.9-40 40-40s40 17.9 40 40zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z"/>
          </svg>
          </div>
          <p>You have an active game session</p>
          <div className="reconnect-message">Would you like to reconnect to your game?</div>
        </div>
        <div className="invitation-modal-footer">
          <button 
            className="invitation-btn decline"
            onClick={() => handleNoReconnect()}
          >
            Decline
          </button>
          <button 
            className="invitation-btn accept"
            onClick={() => handleOkReconnect()}
          >
            Reconnect
          </button>
        </div>
        <div className="invitation-timer">
          <div className="invitation-timer-bar reconnect-timer"></div>
        </div>
        <div className="invitation-timer-info">Auto-reconnecting in 10 seconds</div>
      </div>
    </div>
  );
};

export default InvitationModal;