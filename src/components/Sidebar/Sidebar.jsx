// import React, { useState } from "react";
// import MenuIcon from "@mui/icons-material/Menu";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import ChatIcon from "@mui/icons-material/Chat";
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
// import HistoryIcon from "@mui/icons-material/History";
// import SettingsIcon from "@mui/icons-material/Settings";
// import "./sidebar.css";

// const SidebarIcon = ({ Icon }) => (
//   <Icon className="w-2 h-auto text-slate-600 " />
// );

// const Sidebar = () => {
//   const [loading, setLoading] = useState(true);
//   return (


//      <div className={`sidebar flex flex-col justify-between max-w-42 min-h-screen pl-3 p-6 bg-slate-100 ${loading ? ' w-48' : 'w-14'}`}>
//       <div className="top ">
//         <button onClick={()=>setLoading(prev=>!prev)}>
         
//           <MenuIcon className="ml-1"   />
//         </button>
// {loading ?
//         <div className="new-chat  mt-10 w-[100%] inline-flex items-center justify-start rounded-md gap-3 px-[15px] py-[10px] bg-slate-300  cursor-pointer">
//           <SidebarIcon Icon={AddBoxIcon} />
//            <p>New Chat</p> 
//         </div>
//         : null}
//         {loading ? (
//           <div className="recent flex flex-col ">
//             <p className="recent-title  mt-4  mb-4">Recent</p>
//             <div className="recent-entry ">
//               {/* <SidebarIcon Icon={ChatIcon} /> */}
//               <ChatIcon sx={{ width: "15px" }} className="flex items-center" />
//               <p className="truncate">
//                 What is react sdasd ds addadasd a sda d asd asdasd a dasd ad
//                 asdasd.?
//               </p>
//             </div>
//           </div>
//         ) : null}
//       </div>

//       <div className="bottom flex flex-col">
//         <div className="bottom-item recent-entry pr-2">
//           <HelpOutlineIcon />
//           {loading ?  <p>Help</p> :null}
//         </div>
//         <div className="bottom-item recent-entry">
//           <HistoryIcon />
//           {loading ?  <p>Activity</p> :null}
//         </div>
//         <div className="bottom-item recent-entry">
//           <SettingsIcon />
//          {loading ?  <p>Setting</p> :null}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ChatIcon from "@mui/icons-material/Chat";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import useChatStore from "../store/chatStore";
import "./sidebar.css";

const SidebarIcon = ({ Icon }) => (
  <Icon className="w-2 h-auto text-slate-600" />
);


const Sidebar = ({ onSelectChatroom }) => {
  const [loading, setLoading] = useState(true);
  const chatrooms = useChatStore((state) => state.chatrooms);


  return (
    <div
      className={`sidebar flex flex-col justify-between max-w-42 min-h-screen pl-3 p-6 bg-slate-100 ${
        loading ? " w-48" : "w-14"
      }`}
    >
      <div className="top">
        <button onClick={() => setLoading((prev) => !prev)}>
          <MenuIcon className="ml-1" />
        </button>

        {loading && (
          <div className="new-chat mt-10 w-[100%] inline-flex items-center justify-start rounded-md gap-3 px-[15px] py-[10px] bg-slate-300 cursor-pointer">
            <SidebarIcon Icon={AddBoxIcon} />
            <p>New Chat</p>
          </div>
        )}

        {loading && (
          <div className="recent flex flex-col">
            <p className="recent-title mt-4 mb-4">Recent</p>

            {chatrooms.map((room) => (
              <div
                key={room.id}
                className="recent-entry"
                onClick={() => onSelectChatroom(room.id)}
              >
                <ChatIcon sx={{ width: "15px" }} className="flex items-center" />
                <p className="truncate">{room.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom flex flex-col">
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
