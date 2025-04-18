import React, { useRef, useState, useEffect } from "react";
import "./AddFriendModal.css";
import { sendFriendRequest } from "../../services/apiFriends";
import GlassCard from "../../common/GlassCard/GlassCard";
import { UserAvatar } from "../../api/entities";
import { IMAGES_EXTENSION, IMAGES_PATH } from "../../services/apiShop";

interface AddFriendModalProps {
  allUsers: UserAvatar[];
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

  /**
   * Filters the list of users based on the search input.
   */
  const filteredUsers = allUsers.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
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
            name="searched-user"
            placeholder="Search by username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar" />

          {/* Box with users */}
          <div className={`player-list`}>
              {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                      // The hole friend
                      <div 
                          key={user.username} 
                          className={`player-item`}
                      >
                          {/* Avatar */}
                          <div className={`player-avatar`}>
                              <img src={`${IMAGES_PATH}/avatar/${user.avatar}${IMAGES_EXTENSION}`} alt="Avatar" className="avatar-image" />
                          </div>

                          {/* Name */}
                          <span className="player-name">
                              {user.username}
                          </span>

                          {/* Button for send request */}
                          { !addedFriends.includes(user.username)
                              ?
                              <button
                                  className='host-badge host-badge-button'
                                  onClick={() => handleAddFriend(user.username)}>
                                  Send a Friendship Request
                              </button>
                              :
                              <span className="host-badge">Already invited!</span>
                          }
                      </div>
                  ))
              ) : (
                  <div className="empty-state">
                      <div className="empty-icon"></div>
                      <p>Any users found</p>
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
};

export default AddFriendModal;