import React, { useState } from "react";
import "./FriendsCommon.css";
import { sendFriendRequest } from "../../services/apiFriends";
import GlassCard from "../../common/GlassCard/GlassCard";
import { FriendsJSON, UserAvatar } from "../../api/entities";
import { IMAGES_EXTENSION, IMAGES_PATH } from "../../services/apiShop";


interface AddFriendModalProps {
  allUsers: UserAvatar[];
  friends: FriendsJSON[];
  onClose: () => void;
}

const AddFriendModal: React.FC<AddFriendModalProps> = ({
  allUsers,
  friends,
  onClose,
}) => {

  // Info searched by the user
  const [searchTerm, setSearchTerm] = useState("");

  // Users added to your friends now
  const [addedFriends, setAddedFriends] = useState<string[]>([]); 

  // Set initial addedFriends list using useEffect to avoid render loop
  React.useEffect(() => {
    const acceptedFriends = allUsers.filter(
      (user) => friends.findIndex(
        (friend) => 
          friend.username === user.username && 
          friend.isAccepted === false)
      !== -1).map((user) => user.username);

    setAddedFriends(acceptedFriends);
  }, [allUsers, friends]);

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
            className="search-input" />

          {/* Box with users */}
          <div className={`player-list`}>
              {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
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
                          { !addedFriends.includes(user.username)
                              ?
                              <button
                                  className='friend-button friend-button-primary'
                                  onClick={() => handleAddFriend(user.username)}>
                                  Send Request
                              </button>
                              :
                              <span className="friend-status friend-status-pending">Sent</span>
                          }
                      </div>
                  ))
              ) : (
                  <div className="empty-friends">
                      <p>No users found</p>
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

export default AddFriendModal;