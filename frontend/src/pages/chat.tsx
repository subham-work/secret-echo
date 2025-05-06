import { useEffect, useState, useRef } from "react";
import axios from "@/utils/axios";
import withAuth from "@/utils/withAuth";
import Header from "@/components/Header";
import { io, Socket } from "socket.io-client";

interface Message {
  _id: string;
  sender: string;
  text: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      return; // Handle case if no token or userId is found
    }

    // Fetch initial messages
    axios
      .get("/messages", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Failed to fetch messages", err));

    // Initialize socket connection
    socketRef.current = io(process.env.NEXT_PUBLIC_API_BASE_URL);

    socketRef.current.emit("join", userId);

    // Listen for new messages
    const handleNewMessage = (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    };

    socketRef.current.on("newMessage", handleNewMessage);

    // Cleanup socket connection on unmount
    return () => {
      socketRef.current?.off("newMessage", handleNewMessage);
      socketRef.current?.disconnect();
    };
  }, []); // Empty dependency array to run on mount

  const handleSend = async () => {
    const token = localStorage.getItem("token");
    if (!text || !token) return;

    setLoading(true);

    try {
      await axios.post(
        "/messages",
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setText(""); // Clear input field
    } catch (error) {
      console.error("Error sending message", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg._id} className="chat-message">
              <span className="chat-sender">{msg.sender}</span>: {msg.text}
            </div>
          ))}
          {loading && <p className="chat-typing">AI is typing...</p>}
        </div>
        <div className="chat-input-bar">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message"
            className="chat-input"
          />
          <button onClick={handleSend} className="chat-send-button">
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default withAuth(ChatPage);
