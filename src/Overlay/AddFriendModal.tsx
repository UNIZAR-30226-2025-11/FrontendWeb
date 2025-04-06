import React, { useRef, useState, useEffect } from "react";
import "../styles/AddFriendModal.css";
import { ips } from "../utils/constants";

interface AddFriendModalProps {
  allUsers: string[];
  onClose: () => void;
}

const AddFriendModal: React.FC<AddFriendModalProps> = ({
  allUsers,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addedFriends, setAddedFriends] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  const filteredUsers = allUsers.filter((user) =>
    user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFriend = async (username: string) => {
    if (!addedFriends.includes(username)) {
      try {
        const response = await fetch(ips.server + "/friends", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resp: { username },
          }),
        });

        if (!response.ok) {
          throw new Error("Friend request failed");
        }

        setAddedFriends((prev) => [...prev, username]);
        console.log(`Friend request sent to ${username}`);
      } catch (err) {
        console.error("Error sending friend request:", err);
        alert("Could not send friend request. Try again later.");
      }
    }
  };

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
    <div className="modal-overlay">
      <div className="add-friend-modal" ref={modalRef}>
        <h2 className="modal-title">Add a Friend</h2>

        <input
          type="text"
          placeholder="Search by username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

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

        <button className="modal-btn close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AddFriendModal;
