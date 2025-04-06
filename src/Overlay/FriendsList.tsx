import React, { useRef, useEffect, useState } from "react";
import "../styles/FriendsList.css";
import AddFriendModal from "./AddFriendModal";
import FriendRequestsModal from "./FriendRequestsModal";
import { ips } from "../utils/constants";

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

  const fetchFriends = async () => {
    try {
      const res = await fetch(ips.server + "/friends", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setFriends(data.users.map((user: any) => user.username));
    } catch (error) {
      console.error("Erreur fetch friends", error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await fetch(ips.server + "/friends/request", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log("friends requests:", data);
      setRequests(data.map((user: any) => user.username));
    } catch (error) {
      console.error("Erreur fetch requests", error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const res = await fetch(ips.server + "/userss", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      console.log("res", res);
      const data = await res.json();
      setAllUsers(data.users.map((user: any) => user.username));
    } catch (error) {
      console.error("Erreur fetch all users", error);
    }
  };

  useEffect(() => {
    fetchFriends();
    fetchRequests();
    fetchAllUsers();
  }, []);

  const handleAccept = async (username: string) => {
    try {
      await fetch(ips.server + "/friends/request", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resp: { username, accept: true },
        }),
      });
      setRequests((prev) => prev.filter((u) => u !== username));
      setFriends((prev) => [...prev, username]);
    } catch (err) {
      console.error("Erreur accept friend", err);
    }
  };

  const handleReject = async (username: string) => {
    try {
      await fetch(ips.server + "/friends/request", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resp: { username, accept: false },
        }),
      });
      setRequests((prev) => prev.filter((u) => u !== username));
    } catch (err) {
      console.error("Erreur reject friend", err);
    }
  };

  const handleRemoveFriend = async (username: string) => {
    try {
      await fetch(ips.server + "/friends", {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resp: { username },
        }),
      });
      setFriends((prev) => prev.filter((friend) => friend !== username));
    } catch (err) {
      console.error("Erreur remove friend", err);
    }
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="friend-modal" ref={modalRef}>
          <div className="modal-actions">
            <button className="modal-btn" onClick={() => setIsAddFriendOpen(true)}>
              Add
            </button>
            <button className="modal-btn" onClick={() => setIsRequestOpen(true)}>
              Requests
            </button>
          </div>
          <h2 className="modal-title">Your Friends</h2>
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
          <button className="modal-btn close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      {isAddFriendOpen && (
        <AddFriendModal
          allUsers={allUsers}
          onClose={() => {
            setIsAddFriendOpen(false);
            onClose();
          }}
        />
      )}

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
