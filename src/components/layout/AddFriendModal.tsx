import React, { useState, useEffect } from "react";
import "./FriendsCommon.css";
import { fetchAllUsers, fetchFriends, sendFriendRequest } from "../../services/apiFriends";
import GlassCard from "../../common/GlassCard/GlassCard";
import { AllUserData, FriendsJSON } from "../../api/entities";
import { IMAGES_EXTENSION, IMAGES_PATH } from "../../services/apiShop";


interface AddFriendModalProps {
  onClose: () => void;
  background: string;
}

const AddFriendModal: React.FC<AddFriendModalProps> = ({
  onClose,
  background
}) => {

  const [allUsers, setAllUsers] = useState<AllUserData[]>([]);
  const [friends, setFriends] = useState<FriendsJSON[]>([]); // Fetch friends from the API
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  // Info searched by the user
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const usersData = await fetchAllUsers();
      const friendsData = await fetchFriends();
      
      setAllUsers(usersData);
      setFriends(friendsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  // Fetch users and friends data
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Filters the list of users based on the search input.
   */
  const filteredUsers = allUsers.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter((user) =>
    !friends.some((friend) => friend.username === user.username)
  );

  /**
   * Sends a friend request to a selected user.
   * Updates local state to mark request as "sent".
   */
  const handleAddFriend = async (username: string) => {
    try {
      // Get the element to animate before any state updates
      const friendElement = document.getElementById(`friend-${username}`);
      
      // Optimistically update the UI by modifying the user in allUsers state
      setAllUsers(prevUsers => 
        prevUsers.map(user => 
          user.username === username 
            ? { ...user, status: "pending" } 
            : user
        )
      );
      
      // Add animation class for visual feedback
      if (friendElement) {
        friendElement.classList.add('request-sent');
        // Show success animation
        setTimeout(() => {
          if (friendElement) {
            friendElement.classList.remove('request-sent');
          }
        }, 2000);
      }
      
      // Actually send the request in the background
      await sendFriendRequest(username);
      console.log(`Friend request sent to ${username}`);
      
    } catch (err) {
      console.error("Error sending friend request:", err);
      alert("Could not send friend request. Try again later.");
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
          {/* Semi-title with refresh button */}
          <div className="section-header">
            <h3 className="section-label">
              Registered users in the app
            </h3>
            <button 
              className={`refresh-button ${refreshing ? 'rotating' : ''}`}
              onClick={handleRefresh}
              disabled={isLoading}
              aria-label="Refresh users list"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path 
                  d="M18.537 19.567A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 2.136-.67 4.116-1.81 5.74L17 12h3a8 8 0 1 0-2.46 5.772l.997 1.795z" 
                  fill="rgba(255,255,255,0.8)"
                />
              </svg>
            </button>
          </div>

          {/* Search input */}
          <input
            type="text"
            name="searched-user"
            placeholder="Search by username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input" />

          {/* Box with users */}
          <div className={`player-list ${isLoading ? 'loading-fade' : ''}`}>
              {isLoading ? (
                <div className="loading-indicator">
                  <div className="loading-spinner"></div>
                  <p>Loading users...</p>
                </div>
              ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                      // The whole friend
                      <div 
                          key={user.username} 
                          className={`friend-item`}
                          id={`friend-${user.username}`}
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
                          { 
                              user?.status === "none" ?
                              <button
                                  className='friend-button friend-button-primary'
                                  onClick={() => handleAddFriend(user.username)}>
                                  Send Request
                              </button>
                              :
                              <span className="friend-status friend-status-pending">Already Sent</span>
                          }
                      </div>
                  ))
              ) : (
                  <div className="empty-friends">
                      <p>No users found</p>
                      {searchTerm && <p>Try a different search term</p>}
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