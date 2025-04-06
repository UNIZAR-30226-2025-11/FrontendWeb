import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./Chat.css";
import { useSocket } from "../../context/SocketContext";
import { postMessage } from "../../services/socketService";

type Message = {
  sender: "me" | "other";
  text: string;
};

export const Chat = () => {
    const socket = useSocket();
  const [input, setInput] = useState("");
  const [lastUser, setLastUser] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter")
    {
        postMessage(socket.socket,
                    input,
                    socket.gameState?.lobbyId!);
        setInput("");
    }
  };

  useEffect(() => {
    setLastUser(socket.messagesChat?.messages[socket.messagesChat.messages.length-1].username!)
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [socket.messagesChat]);


  return (
    <div className="chat-container">
      <div className="chat-messages">

        {/* Show messages */}
        {socket.messagesChat?.messages.map((msg, index) => (
            <div className={`chat-bubble ${msg.username === socket.gameState?.playerUsername ? "chat-me" : "chat-other"}`}>  
                <p>
                    {msg.username}
                </p>
                <div key={index}>
                    {msg.msg}
                </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="chat-input-area">
        {/* Text field */}
        <input
          type="text"
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
        />

        {/* Button for send */}
        <button className="chat-send-btn" onClick={() => {
            postMessage(socket.socket,
                        input,
                        socket.gameState?.lobbyId!);
            setInput("");
        }}>
          Send
        </button>
      </div>
    </div>
  );
}
