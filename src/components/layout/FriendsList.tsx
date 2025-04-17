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

export const FriendsList = () =>
{
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
  
        const requestsData = await fetchFriendRequests();
        setRequests(requestsData);

        const allUsersData = await fetchAllUsers();
        setAllUsers(allUsersData);

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

  const requestsOfFriends = () => {
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
              onClick={() => {setIsRequestOpen(false)}}
          >
            <span className="GC-button-text">
              Back to your friends
            </span>
          </button>
        </div>
      </GlassCard> 
    )
  }

  const fetch = async () => {
    try {
      const friendsData = await fetchFriends();
      setFriends(friendsData);

      const requestsData = await fetchFriendRequests();
      setRequests(requestsData);

      console.log("B")

      const allUsersData = await fetchAllUsers();

      console.log("D")
      setAllUsers(allUsersData);
      console.log("E")

    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  }

  const friendsPage = () => {
    console.log("All users: ", allUsers)
    if (isAddFriendOpen)
    {   
      return <AddFriendModal
                allUsers={allUsers}
                onClose={() => {setIsAddFriendOpen(false)}} />
    }
    else if (isRequestOpen)
      return requestsOfFriends();
    else
      return seeYourFriends();
  }
  
  return friendsPage();

    // <>
    //   <div className="modal-overlay">
    //     <div className="friend-modal" ref={modalRef}>
    //       <div className="modal-actions">
    //         {/* Open add friend modal */}
    //         <button className="modal-btn" onClick={() => setIsAddFriendOpen(true)}>
    //           Add
    //         </button>
    //         {/* Open friend requests modal */}
    //         <button className="modal-btn" onClick={() => setIsRequestOpen(true)}>
    //           Requests
    //         </button>
    //       </div>

    //       <h2 className="modal-title">Your Friends</h2>

    //       {/* List of friends */}
    //       <ul className="friend-list">
    //         {friends.length > 0 ? (
    //           friends.map((friend, index) => (
    //             <li key={index} className="friend-item">
    //               {friend}
    //               <button 
    //                 className="remove-friend-btn"
    //                 onClick={() => handleRemoveFriend(friend)}
    //               >
    //                 Remove
    //               </button>
    //             </li>
    //           ))
    //         ) : (
    //           <li className="no-friends">You have no friends yet.</li>
    //         )}
    //       </ul>

    //       {/* Close button */}
    //       <button className="modal-btn close-btn" onClick={() =>  {}}>
    //         Close
    //       </button>
    //     </div>
    //   </div>

    //   {/* Add friend modal */}
    //   {isAddFriendOpen && (
    //     <AddFriendModal
    //       allUsers={allUsers}
    //       onClose={() => {
    //         setIsAddFriendOpen(false);
    //       }}
    //     />
    //   )}

    //   {/* Friend requests modal */}
    //   {isRequestOpen && (
    //     <FriendRequestsModal
    //       requests={requests}
    //       onClose={() => {
    //         setIsRequestOpen(false);
    //       }}
    //       onAccept={handleAccept}
    //       onReject={handleReject}
    //     />
    //   )}
};
