

import "./Main.css";
import React, { useState } from "react";
import useChatStore from "../store/chatstore";

const fakeAiReplies = [
  "React is a JavaScript library.",
  "You can build components in React.",
  "React manages the Virtual DOM efficiently.",
];

const Main = ({ selectedChatroomId, onSelectChatroom }) => {
  const chatrooms = useChatStore((state) => state.chatrooms);
  const addMessage = useChatStore((state) => state.addMessage);
  const addChatroom = useChatStore((state) => state.addChatroom); // new
  const [image, setImage] = useState(null);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatroom = chatrooms.find((room) => room.id === selectedChatroomId);

  // image upload handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = () => {
    if (!input.trim() && !image) return;

    // If no chatroom selected, create one first
    let roomId = selectedChatroomId;
    if (!chatroom) {
      const newTitle = input.trim().slice(0, 30) || "New Chat";
      const newId = Date.now();

      // add new chatroom to store
      useChatStore.setState((state) => ({
        chatrooms: [
          ...state.chatrooms,
          { id: newId, title: newTitle, messages: [] },
        ],
      }));

      // select it
      onSelectChatroom(newId);
      roomId = newId;
    }

    // add the user message
    const userMsg = { sender: "user", text: input, image: image || null };
    addMessage(roomId, userMsg);

    setInput("");
    setImage(null);
    setIsTyping(true);

    // fake AI reply
    setTimeout(() => {
      const aiMsg = {
        sender: "ai",
        text: fakeAiReplies[Math.floor(Math.random() * fakeAiReplies.length)],
        image: null,
      };
      addMessage(roomId, aiMsg);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="main flex-1 p-6 flex flex-col  max-w-[900px] m-auto justify-center">
      {!chatroom && (
        <>
          <div className="greet">
            <p>
              <span>Hello, Dev.</span>
            </p>
            <p>How can I help you?</p>
          </div>

          <div className="main-bottom">
            <div className="search-box">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Enter a prompt here"
              />
              <div className="flex gap-2 items-center justify-center">
                <img
                  onClick={handleSend}
                  className="w-6 "
                  src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/2/send-o8c93q4i0jnvkty2dachb.png/send-fept9s28oheau3ys9l4ce.png?_a=DATAg1AAZAA0"
                  alt="Send"
                />
                <img
                  className="w-8 "
                  src="https://png.pngtree.com/png-clipart/20190921/original/pngtree-file-upload-icon-png-image_4718142.jpg"
                  alt=""
                />
                <img
                  className="w-6 "
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8APX475jAOzkQKE9XlwoPMvuL1BaJqn40qw&s"
                  alt=""
                />
              </div>
            </div>
            <p className="bottominfo">
              Gemini may display inaccurate info, including about people, so
              double check
            </p>
          </div>
        </>
      )}

      {chatroom && (
        <div className="chatroom mt-6 flex flex-col w-full  items-center justify-center p-4 rounded flex-1">
          <h2 className="font-bold text-xl mb-4">{chatroom.title}</h2>

          <div className="flex-1 overflow-y-auto mb-4 w-full flex flex-col">
            {chatroom.messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 my-1 rounded ${
                  msg.sender === "user"
                    ? "bg-blue-200 self-end"
                    : "bg-gray-300"
                }`}
              >
                <p>{msg.text}</p>
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="uploaded"
                    className="mt-2 max-w-full rounded"
                  />
                )}
              </div>
            ))}
            {isTyping && (
              <div className="italic text-gray-500 flex items-center gap-2">
                <img
                  src="https://img.icons8.com/?size=512&id=4pNZ188GistO&format=png"
                  alt="loading"
                  className="w-6 h-6"
                />
                <span>Gemini is typing...</span>
              </div>
            )}
          </div>

          <div className="search-box w-full">
            {image && (
              <div className="image-preview mt-4 mb-2 flex items-center gap-2">
                <img
                  src={image}
                  alt="preview"
                  className="max-w-[100px] rounded border"
                />
                <button
                  className="text-red-500"
                  onClick={() => setImage(null)}
                >
                  Remove
                </button>
              </div>
            )}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Enter a prompt here"
            />

            <div className="flex gap-2 items-center justify-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="imageUpload"
              />

              <label htmlFor="imageUpload" className="cursor-pointer">
                <img
                  className="w-8"
                  src="https://png.pngtree.com/png-clipart/20190921/original/pngtree-file-upload-icon-png-image_4718142.jpg"
                  alt="Upload"
                />
              </label>
              <img
                onClick={handleSend}
                className="w-6 "
                src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/2/send-o8c93q4i0jnvkty2dachb.png/send-fept9s28oheau3ys9l4ce.png?_a=DATAg1AAZAA0"
                alt="Send"
              />

              <img
                className="w-6 "
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8APX475jAOzkQKE9XlwoPMvuL1BaJqn40qw&s"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;

