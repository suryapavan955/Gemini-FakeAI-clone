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

     {isLoggedIn ? (
        <div className="App flex w-100% min-h-screen">
          <Sidebar onSelectChatroom={(id) => setSelectedChatroomId(id)} />
          <Main selectedChatroomId={selectedChatroomId} onSelectChatroom={(id) => setSelectedChatroomId(id)} />
        </div>
      ) : (
        <Auth onLoginSuccess={() => setIsLoggedIn(true)} />
      )}

    </>
  );
}

export default App;
