import { useNavigate } from "react-router-dom";
import TabBar from "../components/TabBar";
import useChat from "../hooks/useChat";
import "./Main.css";
import CloseIcon from "@mui/icons-material/Close";

const Main = () => {
  const navigate = useNavigate();
  const { chats, deleteChat } = useChat();
  return (
    <>
      <div id="main">
        <h3>My Chat List</h3>
        <ul>
          {chats.map((chat) => (
            <li key={chat.id} onClick={() => navigate(`/chat/${chat.id}`)}>
              <h4>{chat.title}</h4>
              <p>{chat.messages[2]?.message || chat.messages[0].message}</p>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat.id);
                }}
              >
                <CloseIcon />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <TabBar />
    </>
  );
};

export default Main;
