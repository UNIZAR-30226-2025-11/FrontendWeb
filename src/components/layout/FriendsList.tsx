import React, { useEffect, useState } from "react";
import "./FriendsCommon.css";
import AddFriendModal from "./AddFriendModal";
import FriendRequestsModal from "./FriendRequestsModal";
import {
  fetchFriends,
  respondToFriendRequest,
  removeFriend
} from "../../services/apiFriends";
import GlassCard from "../../common/GlassCard/GlassCard";
import { useUser } from "../../context/UserContext";
import { FriendsJSON } from "../../api/entities";
import { IMAGES_EXTENSION, IMAGES_PATH } from "../../services/apiShop";
import ConfirmationModal from "./ConfirmationModal";

import "../../../src/common/GlassCard/GlassCard.css"

export const FriendsList = () =>
{
  // Store information about users to show
  const [friends, setFriends] = useState<FriendsJSON[]>([]);

  const [numRequest, setNumRequest] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  // Manage the windows shown
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  // Information of the current user
  const userContext = useUser();

  // Add new state for confirmation modal
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    username: "",
    title: "",
    message: ""
  });

  // Add function to confirm removal
  const confirmRemoveFriend = async () => {
    try {
      await removeFriend(confirmationModal.username);
      fetchData(); // Refresh the data after removing
      // Close the modal
      setConfirmationModal(prev => ({...prev, isOpen: false}));
    } catch (err) {
      console.error("Error removing friend:", err);
    }
  };

  // Add function to close modal
  const closeConfirmationModal = () => {
    setConfirmationModal(prev => ({...prev, isOpen: false}));
  };


  const fetchData = async () => {
    setRefreshing(true);
    try {
      // Load your friends
      const friendsData: {friends: FriendsJSON[], numRequests: number} = await fetchFriends();
      setFriends(friendsData.friends);
      setNumRequest(friendsData.numRequests);
    } catch (error) {
      console.error("Error fetching friends data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  // Handle refresh button click
  const handleRefresh = () => {
    fetchData();
  };

  // Fetch data
  useEffect(() => {
    fetchData();
  }, [isAddFriendOpen, isRequestOpen]);  

  /**
   * Accept a friend request and update the UI.
   * @param username The username of the friend to accept
   */
  const handleAccept = async (username: string) => {
    try {
      await respondToFriendRequest(username, true);
      fetchData(); // Refresh the data after accepting
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
      fetchData(); // Refresh the data after rejecting
    } catch (err) {
      console.error("Error rejecting friend request:", err);
    }
  };

  /**
   * Remove a friend and update the UI.
   * @param username The friend's username
   */
  const handleRemoveFriend = async (username: string) => {
    setConfirmationModal({
      isOpen: true,
      username,
      title: "Remove Friend",
      message: `Are you sure you want to remove ${username} from your friends list?`
    });
  };

  const background = userContext.user?.userPersonalizeData.background || "default";
  const seeYourFriends = () => {
    return (
      <GlassCard
          title="Friends"
          maxwidth="700px"
          minwidth="320px"
          showPaws={true}
          background={background}
      >
        {/* Players in the lobby */}
        <div className="players-section">
          {/* Section header with refresh button */}
          <div className="section-header">
            <h3 className="section-label">Your Friends</h3>
            <button 
              className={`refresh-button ${refreshing ? 'rotating' : ''}`}
              onClick={handleRefresh}
              disabled={refreshing}
              aria-label="Refresh friends list"
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
          
          <div className={`player-list ${refreshing ? 'loading-fade' : ''}`}>
              {refreshing && friends.length === 0 ? (
                <div className="loading-indicator">
                  <div className="loading-spinner"></div>
                  <p>Loading friends...</p>
                </div>
              ) : friends.length > 0 ? (
                  friends.map((user) => (
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

                          {/* Button for deleting a friend */}
                          <button 
                            className='friend-button friend-button-danger'
                            onClick={() => handleRemoveFriend(user.username)}
                          >
                            Remove
                          </button>
                      </div>
                  ))
              ) : (
                  <div className="empty-friends">
                      <p>You don&apos;t have friends yet...</p>
                  </div>
              )}
          </div>
        </div>

        {/* Buttons */}
        <div className="GC-button-group">
          {/* Button for adding new friends */}
          <button
              className={"GC-button GC-blue-btn"}
              onClick={() => {setIsAddFriendOpen(true)}}
          >
            Search for new friends
          </button>

          {/* Button for check out requests with notification badge */}
          <button
              className={`GC-button ${numRequest > 0 ? 'GC-red-btn request-btn-active' : 'GC-gray-btn'}`}
              onClick={() => {setIsRequestOpen(true)}}
          >
            Check out your requests
            {numRequest > 0 && (
              <span className="request-badge">{numRequest}</span>
            )}
          </button>
        </div>

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={confirmationModal.isOpen}
          onClose={closeConfirmationModal}
          onConfirm={confirmRemoveFriend}
          title={confirmationModal.title}
          message={confirmationModal.message}
          confirmText="Remove"
          cancelText="Cancel"
        />
      </GlassCard>
    );
  }

  const friendsPage = () => {
    if (isAddFriendOpen)
    {   
      return <AddFriendModal
                onClose={() => setIsAddFriendOpen(false)} 
                background={background}/>
    }
    else if (isRequestOpen)
      return <FriendRequestsModal
                onClose={() => setIsRequestOpen(false)}
                onAccept={handleAccept}
                onReject={handleReject}
                background={background}/>
    else
      return seeYourFriends();
  }
  
  return friendsPage();

};