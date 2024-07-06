import React from "react";
import {
  ChatContainer,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useState } from "react";
import { Button } from "@mui/material";
import "./Chat.css";
import useChat from "../hooks/useChat";
import { useNavigate, useParams } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addChat, getChat } = useChat();
  const chatData = getChat(id);
  const [messages, setMessages] = useState(
    chatData
      ? chatData.messages
      : [
          {
            message: "Hello, I am Cosmo Chat",
            sender: "assistant",
            direction: "incoming",
          },
        ]
  );
  const [typing, setTyping] = useState(false);
  const [title, setTitle] = useState(chatData ? chatData.title : "New Chat");

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setTyping(true);

    await processMessageToChatGPT(newMessages);
  };

  const processMessageToChatGPT = async (chatMessages) => {
    const apiMessages = chatMessages.map((message) => ({
      role: message.sender,
      content: message.message,
    }));
    const systemMessage = {
      role: "system",
      content: "Explain all concepts like I am 10 years old",
    };
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_OPENAI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });
    const data = await res.json();
    setTyping(false);
    setMessages([
      ...chatMessages,
      {
        sender: "assistant",
        message: data.choices[0].message.content,
        direction: "incoming",
      },
    ]);
  };

  const onEnd = () => {
    addChat({ id: id, title: title, messages: messages });
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <main id="chat">
      <header>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button variant="contained" color="error" onClick={onEnd}>
          End Chat
        </Button>
      </header>

      <MainContainer>
        <ChatContainer>
          <MessageList
            typingIndicator={
              typing ? <TypingIndicator content="ChatGPT is typing" /> : null
            }
          >
            {messages.map((message, i) => (
              <Message key={i} model={message} />
            ))}
          </MessageList>

          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </main>
  );
};

export default Chat;
