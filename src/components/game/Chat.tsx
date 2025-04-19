import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Chat.css";
import { useSocket } from "../../context/SocketContext";
import { postMessage } from "../../services/socketService";

export const Chat = () => {
  const socket = useSocket();
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [prevMessageCount, setPrevMessageCount] = useState(0);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      postMessage(socket.socket, input, socket.gameState?.lobbyId!);
      setInput("");
    }
  };

  // Focus input when chat expands
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Scroll to bottom on new messages
  useEffect(() => {
    const container = messagesContainerRef.current;
    const messageCount = socket.messagesChat?.messages.length || 0;
    if (!container) return;
   
    const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
  
    if (messageCount > prevMessageCount && isAtBottom) {
      // Scroll at the end of the render
      requestAnimationFrame(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    }
  
    if (!isExpanded) {
      setUnreadCount(prev => prev + (messageCount - prevMessageCount));
    }
    setPrevMessageCount(messageCount);

  }, [socket.messagesChat?.messages.length, isExpanded]);
  
  // Reset unread count when expanded
  useEffect(() => {
    if (isExpanded) {
      setUnreadCount(0);
    }
  }, [isExpanded]);

  // Get username from last message
  const getLastSender = () => {
    if (socket.messagesChat?.messages.length) {
      const lastMessage = socket.messagesChat.messages[socket.messagesChat.messages.length - 1];
      return lastMessage.username;
    }
    return "";
  };
  
  // Create message groups by username
  const getMessageGroups = () => {
    if (!socket.messagesChat?.messages.length) return [];
    
    const groups: Array<{username: string, messages: string[], isCurrentUser: boolean}> = [];
    let currentGroup: {username: string, messages: string[], isCurrentUser: boolean} | null = null;
    
    socket.messagesChat.messages.forEach(msg => {
      const isCurrentUser = msg.username === socket.gameState?.playerUsername;
      
      if (!currentGroup || currentGroup.username !== msg.username) {
        if (currentGroup) {
          groups.push(currentGroup);
        }
        currentGroup = {
          username: msg.username,
          messages: [msg.msg],
          isCurrentUser
        };
      } else {
        currentGroup.messages.push(msg.msg);
      }
    });
    
    if (currentGroup) {
      groups.push(currentGroup);
    }
    
    return groups;
  };

  return (
    <>
      <motion.div 
        className={`chat-toggle-btn ${unreadCount > 0 ? 'has-unread' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="chat-icon">
          {isExpanded ? '×' : '💬'}
        </div>
        {!isExpanded && unreadCount > 0 && (
          <div className="unread-badge">{unreadCount}</div>
        )}
        {!isExpanded && unreadCount > 0 && socket.messagesChat && socket.messagesChat?.messages?.length > 0 && (
          <div className="last-message-preview">
            <strong>{getLastSender()}</strong>: {socket.messagesChat.messages[socket.messagesChat.messages.length - 1].msg}
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="chat-container"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="chat-header">
              <h3>Game Chat</h3>
            </div>
            
            <div className="chat-messages" ref={messagesContainerRef}>
              {getMessageGroups().map((group, groupIndex) => (
                <div 
                  key={groupIndex} 
                  className={`message-group ${group.isCurrentUser ? 'message-group-me' : 'message-group-other'}`}
                >
                  <div className="message-username">{group.username}</div>
                  {group.messages.map((msg, msgIndex) => (
                    <div 
                      key={`${groupIndex}-${msgIndex}`} 
                      className={`chat-bubble ${group.isCurrentUser ? 'chat-me' : 'chat-other'}`}
                    >
                      {msg}
                    </div>
                  ))}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div className="chat-input-area">
              <input
                ref={inputRef}
                type="text"
                className="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
              />

              <button 
                className="chat-send-btn" 
                onClick={() => {
                  if (input.trim()) {
                    postMessage(socket.socket, input, socket.gameState?.lobbyId!);
                    setInput("");
                  }
                }}
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};