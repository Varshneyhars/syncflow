import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./TeamChat.css"; // Custom CSS for additional styling

const socket = io("http://localhost:5000");

const TeamChat = () => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const messagesEndRef = useRef(null); // Reference to scroll to the last message

  useEffect(() => {
    axios.get("http://localhost:5000/api/chat/history")
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => console.error("Error fetching chat history:", err));

    socket.on("newMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  // Function to scroll to the bottom when messages are updated
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() === "" || !isLoggedIn) return;

    const messageData = {
      sender: username,
      message,
      fileUrl: "",
    };

    socket.emit("sendMessage", messageData);
    setMessage("");
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      {!isLoggedIn ? (
        <div className="card p-4 shadow-lg w-50">
          <h3 className="text-center mb-4">Welcome to Team Chat</h3>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={() => setIsLoggedIn(true)}
            >
              Join Chat
            </button>
          </div>
        </div>
      ) : (
        <div className="card chat-container shadow-lg w-75">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h3 className="mb-0">Team Chat</h3>
            <span>Welcome, {username}!</span>
          </div>
          <div className="card-body chat-messages" style={{ maxHeight: "60vh", overflowY: "scroll" }}>
            {messages.length === 0 ? (
              <p className="text-muted text-center">No messages yet. Start the conversation!</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.sender === username ? "sent" : "received"}`}
                >
                  <div className="message-content">
                    <strong>{msg.sender}:</strong> {msg.message}
                  </div>
                </div>
              ))
            )}
            {/* Scroll to the last message */}
            <div ref={messagesEndRef} />
          </div>
          <div className="card-footer bg-light">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <button className="btn btn-success" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamChat;
