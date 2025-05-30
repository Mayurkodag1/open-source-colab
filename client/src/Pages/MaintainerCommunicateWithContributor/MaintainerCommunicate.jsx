import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../MaintainerCommunicateWithContributor/MaintainerCommunicate.css";

function MaintainerCommunicate() {
  const { projectId, issueId } = useParams();
  const token = localStorage.getItem("token");

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const isProjectChat = Boolean(projectId);
  const endpointType = isProjectChat ? "project" : "issue";
  const chatId = isProjectChat ? projectId : issueId;

  // Fetch chat messages
  useEffect(() => {
    if (!chatId) return;

    axios.get(`http://localhost:3000/api/chat/${endpointType}/${chatId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      // .then(res => setMessages(res.data))
      .then(res => {
      console.log("GET Response:", res);        // full response
      console.log("Chat messages:", res.data);  // response data (messages)
      setMessages(res.data);
    })
     
      .catch(err => console.error(`Failed to load ${endpointType} messages:`, err));
  }, [chatId, endpointType, token]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    axios.post(
      `http://localhost:3000/api/chat/${endpointType}/${chatId}`,
      { content: newMessage },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      }
    )
      .then(res => {
        setMessages(prev => [...prev, res.data]);
        setNewMessage("");
      })
      .catch(err => {
        console.error("Failed to send message:", err);
        alert("Message sending failed");
      });
  };

  return (
    <div className="maintainer-chat-parent p-3">
      <div className="row maintainer-chat-row mt-3">
        <div className="col-sm-3 rounded">
        <h3>Sender Id</h3>
          {[...new Set(messages.map(m => m.sender?._id))].map(userId => (
            <input key={userId} type='text' className='form-control p-3 mb-2' value={userId} readOnly />
          ))}
        </div>
        <div className="col-sm-9 bg-light rounded">
          <div className="chat-box p-3 mb-3" style={{ maxHeight: "400px", overflowY: "scroll" }}>
            {messages.map((msg) => (
              <div key={msg._id} className='mb-2'>
                <strong>{msg.sender?._id}:</strong> {msg.content}
                <div className='text-muted' style={{ fontSize: '0.8rem' }}>
                  {new Date(msg.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className='d-flex maintainer-send-msg'>
            <div className='maintainer-input-field'>
              <input
                type='text'
                className='form-control'
                placeholder='Type a Message'
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </div>
            <div>
              <button className='btn btn-primary' onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaintainerCommunicate;
``