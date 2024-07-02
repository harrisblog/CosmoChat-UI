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
import "./App.css";

const API_KEY = "";

function App() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am ChatGPT",
      sender: "assistant",
      direction: "incoming",
    },
  ]);

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
        Authorization: "Bearer " + API_KEY,
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

  return (
    <div className="App">
      <div style={{ position: "relative", height: "100vh", maxWidth: "700px" }}>
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
      </div>
    </div>
  );
}

export default App;
