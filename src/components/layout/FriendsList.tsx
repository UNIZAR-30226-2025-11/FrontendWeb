import React, { useEffect, useState } from "react";
import "./FriendsCommon.css";
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
import { FriendsJSON, UserAvatar } from "../../api/entities";
import { IMAGES_EXTENSION, IMAGES_PATH } from "../../services/apiShop";
import ConfirmationModal from "./ConfirmationModal";

export const FriendsList = () =>
{
  // Store information about users to show
  const [friends, setFriends] = useState<FriendsJSON[]>([]);
  const [requests, setRequests] = useState<UserAvatar[]>([]);
  const [allUsers, setAllUsers] = useState<UserAvatar[]>([]);

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

    // Load your friends
    const friendsData = await fetchFriends();
    const friendsDataUsernames = friendsData.filter(user => user.isAccepted).map(friend => friend.username);
    setFriends(friendsData);

    // Load your friends requests
    const requestsData = await fetchFriendRequests();
    setRequests(requestsData);

    // Load all users and filter them
    const allUsersData = await fetchAllUsers();
    const filteredUsers = allUsersData.filter(user => !friendsDataUsernames.includes(user.username) && user.username != userContext.user?.username)
    setAllUsers(filteredUsers)

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
                  friends.filter(friend => friend.isAccepted).map((user, index) => (
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
        <div className="button-group">
          {/* Button for adding new friends */}
          <button
              className={"friend-button friend-button-primary"}
              onClick={() => {setIsAddFriendOpen(true)}}
          >
            Search for new friends
          </button>

          {/* Button for check out requests */}
          <button
              className={"friend-button friend-button-success"}
              onClick={() => {setIsRequestOpen(true)}}
          >
            Check out your requests
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
                allUsers={allUsers}
                friends={friends}
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