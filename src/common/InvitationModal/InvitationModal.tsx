import React from 'react';
import { useSocket } from '../../context/SocketContext';
import './InvitationModal.css';

const InvitationModal: React.FC = () => {
  const { friendJoinRequest, acceptInvitation, declineInvitation } = useSocket();

  if (!friendJoinRequest) return null;

  return (
    <div className="invitation-modal-overlay">
      <div className="invitation-modal">
        <div className="invitation-modal-header">
          <h3>Lobby Invitation</h3>
        </div>
        <div className="invitation-modal-body">
          <p><strong>{friendJoinRequest.friendSendingRequest}</strong> has invited you to join their lobby</p>
          <p className="lobby-details">Lobby ID: {friendJoinRequest.lobbyId}</p>
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
      </div>
    </div>
  );
};

export default InvitationModal;