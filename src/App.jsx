import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import React, { useState } from "react";
import Main from "./components/Main/Main";
import Auth from "./components/Auth/Auth";


function App() {

   const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedChatroomId, setSelectedChatroomId] = useState(null);
  return (
    <>

     {/* {isLoggedIn ? ( */}
        <div className="flex">
          <Sidebar onSelectChatroom={(id) => setSelectedChatroomId(id)} />
          <Main selectedChatroomId={selectedChatroomId} />
        </div>
      {/* ) : (
        <Auth onLoginSuccess={() => setIsLoggedIn(true)} />
      )} */}

    {/* {isLoggedIn ? ( */}
        {/* <>
          <Sidebar />
          <Main />
        </> */}
      {/* ) : ( */}
        {/* <Auth onLoginSuccess={() => setIsLoggedIn(true)} /> */}
      {/* )} */}
    </>
  );
}

export default App;
