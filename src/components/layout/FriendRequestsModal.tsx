import React, { useRef, useEffect, useState } from "react";
import "./FriendsCommon.css";
import GlassCard from "../../common/GlassCard/GlassCard";
import { UserAvatar } from "../../api/entities";
import { IMAGES_EXTENSION, IMAGES_PATH } from "../../services/apiShop";
import { fetchFriendRequests } from "../../services/apiFriends";

interface FriendRequestsModalProps {
  onClose: () => void;
  onAccept: (username: string) => void;
  onReject: (username: string) => void;
  background: string;
}

const FriendRequestsModal: React.FC<FriendRequestsModalProps> = ({
  onClose,
  onAccept,
  onReject,
  background,
}) => {
  
  const modalRef = useRef<HTMLDivElement>(null);
  
  const [requests, setRequests] = useState<UserAvatar[]>([]);

  const fetchData = async () => {
    try {
      const request = await fetchFriendRequests();
      setRequests(request);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleAccept = (username: string) => {
    onAccept(username);
    // Remove the request from the list
    setRequests(prev => prev.filter(user => user.username !== username));
  };

  const handleReject = (username: string) => {
    onReject(username);
    // Remove the request from the list
    setRequests(prev => prev.filter(user => user.username !== username));
  };

  return (
    <GlassCard
          title="Friends"
          maxwidth="700px"
          minwidth="320px"
          showPaws={true}
          background={background}
    >
      {/* Users in the app */}
      <div className="players-section">
          {/* Semi-title */}
          <h3 className="section-label">
            Requests from other users
          </h3>

          {/* Box with users */}
          <div className={`player-list`}>
              {requests.length > 0 ? (
                  requests.map((user, index) => (
                      // The whole friend
                      <div 
                          key={user.username} 
                          className={`friend-item`}
                      >
                          {/* Avatar */}
                          <div className={`friend-avatar`}>
                              <img src={`${IMAGES_PATH}/avatar/${user.avatar}${IMAGES_EXTENSION}`} alt="Avatar" />
                          </div>

                          {/* Name */}
                          <span className="friend-name">
                              {user.username}
                          </span>

                          {/* Button for send request */}
                          <div className="request-actions">
                            <button
                              className='friend-button friend-button-success'
                              onClick={() => handleAccept(user.username)}
                            >
                              Accept
                            </button>
                            <button
                              className='friend-button friend-button-danger'
                              onClick={() => handleReject(user.username)}
                            >
                              Reject
                            </button>
                          </div>
                      </div>
                  ))
              ) : (
                  <div className="empty-friends">
                      <p>You don&apos;t have any requests...</p>
                  </div>
              )}
          </div>
        </div>

      {/* Buttons */}
      <div className="button-group">
        {/* Button for adding new friends */}
        <button
            className={"friend-button friend-button-neutral"}
            onClick={onClose}
        >
          Back to your friends
        </button>
      </div>
    </GlassCard>
  );
};

export default FriendRequestsModal;