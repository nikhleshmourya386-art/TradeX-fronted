import React, { useState } from "react";
import axios from "axios";
import "./ChatBot.css";
import Menu from "./Menu";
import { Link } from "react-router-dom";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3002/api/chat", {
        message: input,
      });

      const botMsg = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error fetching reply:", error);
      const errorMsg = {
        sender: "bot",
        text: "❌ Failed to fetch reply. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (

                    <>

                    <Menu/>
    <div className="chatbot-container">
                    <Link to="/dashboard" className="btn">
                Back to Dashboard
              </Link>
      <div className="chat-window">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-bubble ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="chat-bubble bot">⏳ Thinking...</div>}
      </div>

      <div className="chat-input-box">
        <input
          type="text"
          placeholder="Ask me anything about stocks, Nifty, trading..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>

    </>
  );
};

export default ChatBot;
