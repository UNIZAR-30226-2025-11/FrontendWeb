import React, { useRef, useEffect, useState } from "react";
import "./FriendRequestsModal.css";
import GlassCard from "../../common/GlassCard/GlassCard";

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
            Requests from other users
          </h3>

          {/* Box with users */}
          <div className={`player-list`}>
              {requests.length > 0 ? (
                  requests.map((request, index) => (
                      // The hole friend
                      <div 
                          key={request} 
                          className={`player-item`}
                      >
                          {/* Avatar */}
                          <div className={`player-avatar`}>
                              {request.charAt(0).toUpperCase()}
                          </div>

                          {/* Name */}
                          <span className="player-name">
                              {request}
                          </span>

                          {/* Button for send request */}
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
                                    className='host-badge host-badge-button'
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
                                    className='host-badge host-badge-button'
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
                      </div>
                  ))
              ) : (
                  <div className="empty-state">
                      <div className="empty-icon"></div>
                      <p>You don&apos;t have any requests...</p>
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

export default FriendRequestsModal;