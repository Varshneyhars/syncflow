import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./TeamChat.css"; // For custom styling

const socket = io("http://localhost:5000");

const TeamChat = () => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Fetch message history
    axios.get("http://localhost:5000/api/chat/history")
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => console.error("Error fetching chat history:", err));

    // Listen for new messages
    socket.on("newMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
      setIsTyping(false);
    });
    
    // Listen for typing events
    socket.on("typing", (user) => {
      if (user !== username) {
        setTypingUser(user);
        setIsTyping(true);
        
        // Clear typing indicator after 3 seconds
        setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }
    });

    return () => {
      socket.off("newMessage");
      socket.off("typing");
    };
  }, [username]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    socket.emit("typing", username);
  };

  const sendMessage = () => {
    if (message.trim() === "" || !isLoggedIn) return;

    const messageData = {
      sender: username,
      message,
      fileUrl: "",
      timestamp: new Date().toISOString()
    };

    socket.emit("sendMessage", messageData);
    setMessage("");
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="team-chat-app">
      <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-gradient-primary">
        {!isLoggedIn ? (
          <div className="card login-card border-0">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <i className="bi bi-chat-square-text-fill display-1 text-primary mb-3"></i>
                <h2 className="card-title mb-1">Welcome to Team Chat</h2>
                <p className="text-muted">Connect with your team in real-time</p>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && username.trim() && setIsLoggedIn(true)}
                />
                <label htmlFor="username">Enter your name</label>
              </div>
              <button
                className="btn btn-primary btn-lg w-100"
                onClick={() => username.trim() && setIsLoggedIn(true)}
                disabled={!username.trim()}
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Join Chat
              </button>
            </div>
          </div>
        ) : (
          <div className="card chat-main-card border-0">
            <div className="card-header bg-primary text-white p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="mb-0">Team Chat</h3>
                  <p className="mb-0 small">Welcome, {username}!</p>
                </div>
                <button 
                  className="btn btn-sm btn-outline-light" 
                  title="Leave Chat"
                  onClick={() => setIsLoggedIn(false)}
                >
                  <i className="bi bi-box-arrow-right"></i>
                </button>
              </div>
            </div>
            
            <div className="card-body p-0">
              <div className="messages-wrapper">
                {messages.length === 0 ? (
                  <div className="empty-chat-state text-center p-5">
                    <i className="bi bi-chat-dots display-1 text-muted mb-3"></i>
                    <h5>No messages yet</h5>
                    <p className="text-muted">Be the first to start the conversation!</p>
                  </div>
                ) : (
                  <div className="messages-list p-3">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`message-item mb-3 ${
                          msg.sender === username ? "sent" : "received"
                        }`}
                      >
                        <div className={`message-bubble rounded-3 p-3 ${
                          msg.sender === username 
                            ? "bg-primary text-white" 
                            : "bg-light border"
                        }`}>
                          <div className="message-header mb-1">
                            <span className={`sender-name ${
                              msg.sender === username ? "text-white-50" : "text-muted"
                            } small`}>
                              {msg.sender === username ? "You" : msg.sender}
                            </span>
                          </div>
                          <div className="message-content">{msg.message}</div>
                          <div className={`message-footer mt-1 text-end small ${
                            msg.sender === username ? "text-white-50" : "text-muted"
                          }`}>
                            {formatTime(msg.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="typing-indicator mb-3">
                        <div className="message-bubble bg-light border rounded-3 p-2">
                          <div className="d-flex align-items-center">
                            <small className="text-muted me-2">{typingUser} is typing</small>
                            <div className="typing-dots">
                              <span className="dot"></span>
                              <span className="dot"></span>
                              <span className="dot"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
            </div>
            
            <div className="card-footer bg-white p-3 border-top">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type a message..."
                  value={message}
                  onChange={handleInputChange}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <button className="btn btn-primary" onClick={sendMessage}>
                  <i className="bi bi-send-fill me-1"></i>
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamChat;