import { useEffect, useState } from "react";

const useChat = () => {
  const [chats, setChats] = useState(
    JSON.parse(localStorage.getItem("chats") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  const addChat = (chat) => {
    // If the current chat exist, update chat. If not, add a new one
    const index = chats.findIndex((chat_) => chat_.id === chat.id);
    if (index >= 0) {
      setChats((prev) => {
        const temp = [...prev];
        temp.splice(index, 1, chat);
        return temp;
      });
    } else {
      setChats((prev) => [...prev, chat]);
    }
  };
  const deleteChat = (id) => {
    const index = chats.findIndex((chat) => chat.id === id);
    setChats((prev) => {
      const temp = [...prev];
      temp.splice(index, 1);
      return temp;
    });
  };
  const getChat = (id) => {
    return chats.find((chat) => chat.id === id);
  };

  return { addChat, deleteChat, getChat, chats };
};

export default useChat;
