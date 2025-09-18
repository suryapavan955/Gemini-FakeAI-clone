

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
      {
      id: Date.now() + 4,
      title: "General Chat",
      messages: [],
    },
    {
      id: Date.now() + 5,
      title: "React Help",
      messages: [],
    },
    {
      id: Date.now() + 6,
      title: "Project Ideas",
      messages: [],
    },
      {
      id: Date.now() + 7,
      title: "General Chat",
      messages: [],
    },
    {
      id: Date.now() + 8,
      title: "React Help",
      messages: [],
    },
    {
      id: Date.now() + 9,
      title: "Project Ideas",
      messages: [],
    },
      {
      id: Date.now() + 10,
      title: "General Chat",
      messages: [],
    },
    {
      id: Date.now() + 11,
      title: "React Help",
      messages: [],
    }
  ],

  addChatroom: (title) =>
  set((state) => {
    const newRoom = { id: Date.now(), title, messages: [] };
    return { chatrooms: [...state.chatrooms, newRoom] };
  }),



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
