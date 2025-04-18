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
import GlassCard from "../../common/GlassCard/GlassCard";
import { useUser } from "../../context/UserContext";

export const FriendsList = () =>
{
  // Store information about users to show
  const [friends, setFriends] = useState<string[]>([]);
  const [requests, setRequests] = useState<string[]>([]);
  const [allUsers, setAllUsers] = useState<string[]>([]);

  // Manage the windows shown
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  // Information of the current user
  const userContext = useUser();

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load your friends
        const friendsData = await fetchFriends();
        setFriends(friendsData);
  
        // Load your friends requests
        const requestsData = await fetchFriendRequests();
        setRequests(requestsData);

        // Load all users and filter them
        const allUsersData = await fetchAllUsers();
        const filteredUsers = allUsersData.filter        ((user:string) => !friendsData.includes(user) && user != userContext.user?.username)
        setAllUsers(filteredUsers)

      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };
  
    fetchData();
  }, [isAddFriendOpen, isRequestOpen]);  

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



  const seeYourFriends = () => {
    return (
      <GlassCard
          title="Friends"
          maxwidth="700px"
          minwidth="320px"
          showPaws={true}
      >
        {/* Players in the lobby */}
        <div className="players-section">
          <h3 className="section-label">Your Friends</h3>
          <div className={`player-list`}>
              {friends.length > 0 ? (
                  friends.map((username, index) => (
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

                          {/* Button for deleting a friend */}
                          <button 
                            className='host-badge host-badge-button'
                            onClick={() => handleRemoveFriend(username)}
                          >
                            Remove
                          </button>
                      </div>
                  ))
              ) : (
                  <div className="empty-state">
                      <div className="empty-icon"></div>
                      <p>You don&apos;t have friends yet...</p>
                  </div>
              )}
          </div>
        </div>


        {/* Buttons */}
        <div className="button-group">
          {/* Button for adding new friends */}
          <button
              className={"GC-button GC-red-btn"}
              onClick={() => {setIsAddFriendOpen(true)}}
          >
            <span className="GC-button-text">
              Search for new friends
            </span>
          </button>

          {/* Button for check out requests */}
          <button
              className={"GC-button GC-red-btn"}
              onClick={() => {setIsRequestOpen(true)}}
          >
            <span className="GC-button-text">
              Check out your requests
            </span>
          </button>
        </div>
      </GlassCard>
    )
  }

  const friendsPage = () => {
    if (isAddFriendOpen)
    {   
      return <AddFriendModal
                allUsers={allUsers}
                onClose={() => setIsAddFriendOpen(false)} />
    }
    else if (isRequestOpen)
      return <FriendRequestsModal
                requests={requests}
                onClose={() => setIsRequestOpen(false)}
                onAccept={handleAccept}
                onReject={handleReject}/>
    else
      return seeYourFriends();
  }
  
  return friendsPage();

};