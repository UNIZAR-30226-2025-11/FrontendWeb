import React, { useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import './InvitationModal.css';
import { IMAGES_EXTENSION, IMAGES_PATH } from '../../services/apiShop';

const InvitationModal: React.FC = () => {
  const { friendJoinRequest, acceptInvitation, declineInvitation } = useSocket();

  // Auto-decline after 10 seconds
  useEffect(() => {
    if (!friendJoinRequest) return;
    
    const timer = setTimeout(() => {
      if (friendJoinRequest) {
        declineInvitation(friendJoinRequest.lobbyId);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [friendJoinRequest, declineInvitation]);

  if (!friendJoinRequest) return null;

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
            onClick={() => declineInvitation(friendJoinRequest.lobbyId)}
          >
            Decline
          </button>
          <button 
            className="invitation-btn accept"
            onClick={() => acceptInvitation(friendJoinRequest.lobbyId)}
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
};

export default InvitationModal;