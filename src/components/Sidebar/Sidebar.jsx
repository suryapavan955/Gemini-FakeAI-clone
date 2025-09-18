import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ChatIcon from "@mui/icons-material/Chat";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import useChatStore from "../store/chatstore";
import "./sidebar.css";

const SidebarIcon = ({ Icon }) => (
  <Icon className="w-2 h-auto text-slate-600" />
);


const Sidebar = ({ onSelectChatroom }) => {
  const [loading, setLoading] = useState(true);
  const chatrooms = useChatStore((state) => state.chatrooms);
  const addChatroom = useChatStore((state) => state.addChatroom); 
   const [showInput, setShowInput] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  
  return (
    <div className={`sidebar flex flex-col  justify-between overflow-y-auto h-screen pl-3 p-6 bg-slate-100 ${loading ? " w-60" : "w-14" }`}>

      <div className="top">

        <button onClick={() => setLoading((prev) => !prev)}>
          <MenuIcon className="ml-1" />   
        </button>


            {loading && (
                    <>
                      {!showInput && (
                        <div
                          className="new-chat mt-10 mb-4 w-[100%] inline-flex items-center justify-start rounded-md gap-3 px-[15px] py-[10px] bg-slate-300 cursor-pointer"
                          onClick={() => setShowInput(true)}
                        >
                          <SidebarIcon Icon={AddBoxIcon} />
                          <p>New Chat</p>
                        </div>
                      )}

                      {showInput && (
                        <div className="mt-4 mb-4 w-[100%] flex items-center gap-2">
                          <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && newTitle.trim()) {
                                const id = Date.now();
                                addChatroom(newTitle.trim());
                                onSelectChatroom(id); // auto-select new chat
                                setNewTitle("");
                                setShowInput(false);
                              }
                            }}
                            placeholder="Chatroom name"
                            className="flex-1 px-3  w-5 py-2 rounded-md border border-gray-300 outline-none"
                          />
                          <button
                            className="bg-blue-500 text-white px-3 py-2 rounded-md"
                            onClick={() => {
                              if (!newTitle.trim()) return;
                              const id = Date.now();
                              addChatroom(newTitle.trim());
                              onSelectChatroom(id);
                              setNewTitle("");
                              setShowInput(false);
                            }}
                          >
                            Add
                          </button>
                          <button
                            className="text-red-500 px-2 py-2"
                            onClick={() => {
                              setShowInput(false);
                              setNewTitle("");
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </>
                  )}

        {loading && (
         <div className="recent flex-1 flex flex-col overflow-y-auto px-4">

            <p className="recent-title mt-4 mb-4">Recent</p>

            {chatrooms.map((room) => (
              <div
                key={room.id}
                className="recent-entry "
                onClick={() => onSelectChatroom(room.id)}
              >
                <ChatIcon sx={{ width: "15px" }} className="flex items-center" />
                <p className="truncate">{room.title}</p>
              </div>
            ))}
          </div>
          )}
      </div>

      <div className="bottom flex flex-col mt-4 bottom-0 postion-sticky">
        <div className="bottom-item recent-entry pr-2">
          <HelpOutlineIcon />
          {loading && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <HistoryIcon />
          {loading && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <SettingsIcon />
          {loading && <p>Setting</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
