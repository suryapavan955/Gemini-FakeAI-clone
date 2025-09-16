// import React from "react"
// import "./Main.css"
// const Main = ()=>{
//     return(
//         <div className="main"> 
//             <div className="nav">
//                 <p>Gemini</p>
//                 <img   src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" alt="Logo" />
//             </div>
//         <div className="main-container">
//             <div className="greet">
//                 <p><span>Hello, Dev.</span></p>
//                 <p>how can i help you?</p>
//             </div>
          

//             <div className="main-bottom">
//                 <div className="search-box">
//                     <input type="text " placeholder="Enter a prompt here" />
//                     <div className="flex gap-2 items-center">  
//                         <img className="w-6 " src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/2/send-o8c93q4i0jnvkty2dachb.png/send-fept9s28oheau3ys9l4ce.png?_a=DATAg1AAZAA0" alt="" />
//                         <img className="w-6 " src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/2/send-o8c93q4i0jnvkty2dachb.png/send-fept9s28oheau3ys9l4ce.png?_a=DATAg1AAZAA0" alt="" />
//                         <img className="w-6 " src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/2/send-o8c93q4i0jnvkty2dachb.png/send-fept9s28oheau3ys9l4ce.png?_a=DATAg1AAZAA0" alt="" />
                        
//                     </div>
//                 </div>
//                 <p className="bottominfo">
//                     Gemini may display inaccurate info, including abot people, so double check
//                 </p>
//             </div>
//         </div >

//         </div>
//     )
// }
// export default Main;


// import React, { useState, useEffect } from "react";
// import useChatStore from "../store/chatStore";


// const fakeAiReplies = [
//   "React is a JavaScript library.",
//   "You can build components in React.",
//   "React manages the Virtual DOM efficiently.",
// ];

// const Main = ({ selectedChatroomId }) => {
//   const chatrooms = useChatStore((state) => state.chatrooms);
//   const addMessage = useChatStore((state) => state.addMessage);

//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);

//   const chatroom = chatrooms.find((room) => room.id === selectedChatroomId);

//   const handleSend = () => {
//     if (!input.trim()) return;

//     const userMsg = { sender: "user", text: input };
//     addMessage(chatroom.id, userMsg);
//     setInput("");
//     setIsTyping(true);

//     setTimeout(() => {
//       const aiMsg = {
//         sender: "ai",
//         text:
//           fakeAiReplies[Math.floor(Math.random() * fakeAiReplies.length)],
//       };
//       addMessage(chatroom.id, aiMsg);
//       setIsTyping(false);
//     }, 1500);
//     console.log("Selected Chatroom ID:", selectedChatroomId);
//     console.log("Chatrooms in store:", chatrooms);
    
//   };

//   if (!chatroom)
//     return (
//       <div className="main p-6">
//         <h2>Please select a chatroom from the sidebar.</h2>
//       </div>
//     );

//   return (
//     <div className="main p-6 flex flex-col">
//       <h2 className="font-bold text-xl mb-4">{chatroom.title}</h2>

//       <div className="flex-1 overflow-y-auto mb-4">
//         {chatroom.messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`p-2 my-1 rounded ${
//               msg.sender === "user" ? "bg-blue-200 self-end" : "bg-gray-300"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//         {isTyping && (
//           <div className="italic text-gray-500">Gemini is typing...</div>
//         )}
//       </div>

//       <div className="flex gap-2">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Enter a prompt here"
//           className="flex-1 p-2 border rounded"
//         />
//         <button
//           onClick={handleSend}
//           className="bg-blue-500 text-white p-2 rounded"
//         >
//           Send
//         </button>
    
//       </div>
//     </div>
//   );
      

// };

// export default Main;

import React, { useState } from "react";
import useChatStore from "../store/chatStore";

const fakeAiReplies = [
  "React is a JavaScript library.",
  "You can build components in React.",
  "React manages the Virtual DOM efficiently.",
];

const Main = ({ selectedChatroomId }) => {
  const chatrooms = useChatStore((state) => state.chatrooms);
  const addMessage = useChatStore((state) => state.addMessage);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatroom = chatrooms.find((room) => room.id === selectedChatroomId);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    addMessage(chatroom.id, userMsg);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg = {
        sender: "ai",
        text:
          fakeAiReplies[Math.floor(Math.random() * fakeAiReplies.length)],
      };
      addMessage(chatroom.id, aiMsg);
      setIsTyping(false);
    }, 1500);
  };

  // ✅ Case: No chatrooms exist
  if (chatrooms.length === 0) {
    return (
      <div className="main p-6">
        <div className="greet">
          <p><span>Hello, Dev.</span></p>
          <p>How can I help you?</p>
        </div>

        <div className="search-box mt-6">
          <input
            type="text"
            placeholder="Enter a prompt here"
            className="p-2 border rounded w-full"
          />
        </div>

        <p className="mt-4 text-gray-500">
          Gemini may display inaccurate info, so double check.
        </p>
      </div>
    );
  }

  // ✅ Case: No chatroom selected, but chatrooms exist
  if (!chatroom) {
    return (
      <div className="main p-6">
        <h2>Please select a chatroom from the sidebar.</h2>
      </div>
    );
  }

  // ✅ Case: Chatroom selected
  return (
    <div className="main p-6 flex flex-col">
      <h2 className="font-bold text-xl mb-4">{chatroom.title}</h2>

      <div className="flex-1 overflow-y-auto mb-4">
        {chatroom.messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 my-1 rounded ${
              msg.sender === "user" ? "bg-blue-200 self-end" : "bg-gray-300"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="italic text-gray-500">Gemini is typing...</div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a prompt here"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Main;
