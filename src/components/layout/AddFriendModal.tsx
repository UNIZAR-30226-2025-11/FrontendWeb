import React, { useRef, useState, useEffect } from "react";
import "./AddFriendModal.css";
import { sendFriendRequest } from "../../services/apiFriends";
import GlassCard from "../../common/GlassCard/GlassCard";

interface AddFriendModalProps {
  allUsers: string[];
  onClose: () => void;
}

const AddFriendModal: React.FC<AddFriendModalProps> = ({
  allUsers,
  onClose,
}) => {

  // Info searched by the user
  const [searchTerm, setSearchTerm] = useState("");

  // Users added to your friends now
  const [addedFriends, setAddedFriends] = useState<string[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);

  /**
   * Filters the list of users based on the search input.
   */
  const filteredUsers = allUsers.filter((user) =>
    user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Sends a friend request to a selected user.
   * Updates local state to mark request as "sent".
   */
  const handleAddFriend = async (username: string) => {
    if (!addedFriends.includes(username)) {
      try {
        await sendFriendRequest(username);
        setAddedFriends((prev) => [...prev, username]);
        console.log(`Friend request sent to ${username}`);
      } catch (err) {
        console.error("Error sending friend request:", err);
        alert("Could not send friend request. Try again later.");
      }
    }
  };

  /**
   * Closes modal if user clicks outside of it.
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <GlassCard
          title="Friends"
          maxwidth="700px"
          minwidth="320px"
          showPaws={true}
    >
      {/* Users in the app */}
      <div className="players-section">
          {/* Semi-title */}
          <h3 className="section-label">
            Registered users in the app
          </h3>

          {/* Search input */}
          <input
            type="text"
            placeholder="Search by username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar" />

          {/* Box with users */}
          <div className={`player-list`}>
              {allUsers.length > 0 ? (
                  allUsers.map((username, index) => (
                      // The hole friend
                      <div 
                          key={username} 
                          className={`player-item`}
                      >
                          {/* Avatar */}
                          <div className={`player-avatar`}>
                              {username.charAt(0).toUpperCase()}
                          </div>

                          {/* Name */}
                          <span className="player-name">
                              {username}
                          </span>
                      </div>
                  ))
              ) : (
                  <div className="empty-state">
                      <div className="empty-icon"></div>
                      <p>Loading users...</p>
                  </div>
              )}
          </div>
        </div>

      {/* Buttons */}
      <div className="button-group">
        {/* Button for adding new friends */}
        <button
            className={"GC-button GC-red-btn"}
            onClick={onClose}
        >
          <span className="GC-button-text">
            Back to your friends
          </span>
        </button>
      </div>
    </GlassCard> 
  )

  return (
    <div className="modal-overlay">
      <div className="add-friend-modal" ref={modalRef}>
        <h2 className="modal-title">Add a Friend</h2>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search by username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        {/* List of users filtered by search term */}
        <ul className="friend-list">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <li key={index} className="friend-item-row">
                <span>{user}</span>
                <button
                  className="add-btn"
                  onClick={() => handleAddFriend(user)}
                  disabled={addedFriends.includes(user)}
                >
                  {addedFriends.includes(user) ? "Sent" : "Add"}
                </button>
              </li>
            ))
          ) : (
            <li className="no-friends">No users found.</li>
          )}
        </ul>

        {/* Close modal */}
        <button className="modal-btn close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AddFriendModal;