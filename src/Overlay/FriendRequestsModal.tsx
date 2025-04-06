import React, { useRef, useEffect, useState } from "react";
import "../styles/FriendsRequestsModal.css";
import { ips } from "../utils/constants";

interface FriendRequestsModalProps {
  requests: string[];
  onClose: () => void;
  onAccept: (username: string) => void;
  onReject: (username: string) => void;
}

const FriendRequestsModal: React.FC<FriendRequestsModalProps> = ({
  requests,
  onClose,
  onAccept,
  onReject,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [respondedRequests, setRespondedRequests] = useState<{
    [username: string]: "accepted" | "refused";
  }>({});

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
      <div className="friend-requests-modal" ref={modalRef}>
        <h2 className="modal-title">Friend Requests</h2>

        <ul className="friend-list">
          {requests.length > 0 ? (
            requests.map((request, index) => (
              <li key={index} className="friend-item request-item">
                <span>{request}</span>
                <div className="request-actions">
                  {respondedRequests[request] ? (
                    <button className="modal-btn status">
                      {respondedRequests[request] === "accepted"
                        ? "Accepted"
                        : "Refused"}
                    </button>
                  ) : (
                    <>
                      <button
                        className="modal-btn accept"
                        onClick={() => {
                          onAccept(request);
                          setRespondedRequests((prev) => ({
                            ...prev,
                            [request]: "accepted",
                          }));
                        }}
                      >
                        Accept
                      </button>
                      <button
                        className="modal-btn reject"
                        onClick={() => {
                          onReject(request);
                          setRespondedRequests((prev) => ({
                            ...prev,
                            [request]: "refused",
                          }));
                        }}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))
          ) : (
            <li className="no-friends">No friend requests.</li>
          )}
        </ul>

        <button className="modal-btn close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default FriendRequestsModal;
