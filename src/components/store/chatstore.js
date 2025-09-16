// import {create} from "zustand";

// const useChatStore = create((set) => ({
//   chatrooms: [],

//   addChatroom: (title) =>
//     set((state) => ({
//       chatrooms: [...state.chatrooms, { id: Date.now(), title }],
//     })),

//   deleteChatroom: (id) =>
//     set((state) => ({
//       chatrooms: state.chatrooms.filter((room) => room.id !== id),
//     })),

//   resetChatrooms: () =>
//     set({
//       chatrooms: [],
//     }),
// }));

// export default useChatStore;

import { create } from "zustand";

const useChatStore = create((set) => ({
  chatrooms: [
    {
      id: Date.now() + 1,
      title: "General Chat",
      messages: [],
    },
    {
      id: Date.now() + 2,
      title: "React Help",
      messages: [],
    },
    {
      id: Date.now() + 3,
      title: "Project Ideas",
      messages: [],
    },
  ],

  addChatroom: (title) =>
    set((state) => ({
      chatrooms: [...state.chatrooms, { id: Date.now(), title, messages: [] }],
    })),

  deleteChatroom: (id) =>
    set((state) => ({
      chatrooms: state.chatrooms.filter((room) => room.id !== id),
    })),

  addMessage: (chatroomId, message) =>
    set((state) => ({
      chatrooms: state.chatrooms.map((room) =>
        room.id === chatroomId
          ? {
              ...room,
              messages: [...room.messages, message],
            }
          : room
      ),
    })),
}));

export default useChatStore;
