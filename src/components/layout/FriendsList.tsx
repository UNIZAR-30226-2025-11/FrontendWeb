import React, { useRef, useEffect, useState } from "react";
import "./FriendsList.css";
import AddFriendModal from "./AddFriendModal";
import FriendRequestsModal from "./FriendRequestsModal";
import {
  fetchFriends,
  fetchFriendRequests,
  fetchAllUsers,
  respondToFriendRequest,
  removeFriend
} from "../../services/apiFriends";

interface FriendsListProps {
  onClose: () => void;
}

const FriendsList: React.FC<FriendsListProps> = ({ onClose }) => {
  const [friends, setFriends] = useState<string[]>([]);
  const [requests, setRequests] = useState<string[]>([]);
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const friendsData = await fetchFriends();
        setFriends(friendsData);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
  
      try {
        const requestsData = await fetchFriendRequests();
        setRequests(requestsData);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
  
      try {
        const allUsersData = await fetchAllUsers();
        setAllUsers(allUsersData);
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };
  
    fetchData();
  }, []);  

  /**
   * Accept a friend request and update the UI.
   * @param username The username of the friend to accept
   */
  const handleAccept = async (username: string) => {
    try {
      await respondToFriendRequest(username, true);
      setRequests(prev => prev.filter(u => u !== username));
      setFriends(prev => [...prev, username]);
    } catch (err) {
      console.error("Error accepting friend request:", err);
    }
  };

  /**
   * Reject a friend request and update the UI.
   * @param username The username of the friend to reject
   */
  const handleReject = async (username: string) => {
    try {
      await respondToFriendRequest(username, false);
      setRequests(prev => prev.filter(u => u !== username));
    } catch (err) {
      console.error("Error rejecting friend request:", err);
    }
  };

  /**
   * Remove a friend and update the UI.
   * @param username The friend's username
   */
  const handleRemoveFriend = async (username: string) => {
    try {
      await removeFriend(username);
      setFriends(prev => prev.filter(friend => friend !== username));
    } catch (err) {
      console.error("Error removing friend:", err);
    }
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="friend-modal" ref={modalRef}>
          <div className="modal-actions">
            {/* Open add friend modal */}
            <button className="modal-btn" onClick={() => setIsAddFriendOpen(true)}>
              Add
            </button>
            {/* Open friend requests modal */}
            <button className="modal-btn" onClick={() => setIsRequestOpen(true)}>
              Requests
            </button>
          </div>

          <h2 className="modal-title">Your Friends</h2>

          {/* List of friends */}
          <ul className="friend-list">
            {friends.length > 0 ? (
              friends.map((friend, index) => (
                <li key={index} className="friend-item">
                  {friend}
                  <button 
                    className="remove-friend-btn"
                    onClick={() => handleRemoveFriend(friend)}
                  >
                    Remove
                  </button>
                </li>
              ))
            ) : (
              <li className="no-friends">You have no friends yet.</li>
            )}
          </ul>

          {/* Close button */}
          <button className="modal-btn close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      {/* Add friend modal */}
      {isAddFriendOpen && (
        <AddFriendModal
          allUsers={allUsers}
          onClose={() => {
            setIsAddFriendOpen(false);
            onClose();
          }}
        />
      )}

      {/* Friend requests modal */}
      {isRequestOpen && (
        <FriendRequestsModal
          requests={requests}
          onClose={() => {
            setIsRequestOpen(false);
            onClose();
          }}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}
    </>
  );
};

export default FriendsList;