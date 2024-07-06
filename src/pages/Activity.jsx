import React from "react";
import TabBar from "../components/TabBar";
import "./Activity.css";
import { ResponsiveBar } from "@nivo/bar";
import useChat from "../hooks/useChat";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { useNavigate } from "react-router-dom";

const Activity = () => {
  const navigate = useNavigate();

  const { chats } = useChat();
  let chatsData = chats.map((chat) => {
    let date = new Date(Number(chat.id));
    const options = { month: "short", day: "numeric" };
    date = date.toLocaleDateString("en-US", options);
    return {
      date,
      id: chat.id,
      title: chat.title,
      number: (chat.messages.length - 1) / 2,
    };
  });
  const data = chatsData.reduce((acc, curr) => {
    const existingItem = acc.find((item) => item.date === curr.date);
    if (existingItem) {
      existingItem.number += curr.number;
    } else {
      acc.push({ date: curr.date, number: curr.number });
    }
    return acc;
  }, []);

  return (
    <div id="activity">
      <h2>Activity</h2>

      <h3>My Statistics</h3>
      <p>Graph of the conversation you had with Cosmo Chat recently.</p>
      <div style={{ height: "300px" }}>
        <ResponsiveBar
          data={data}
          keys={["number"]}
          indexBy="date"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          borderColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Date",
            legendPosition: "middle",
            legendOffset: 32,
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickPadding: 5,
            tickRotation: 0,
            legend: "Number",
            legendPosition: "middle",
            legendOffset: -40,
            truncateTickAt: 0,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={(e) =>
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          }
        />
      </div>

      <h3>Details Chat Activity</h3>
      {chatsData.map((chat) => (
        <div
          key={chat.date}
          className="chat_detail"
          onClick={() => navigate(`/chat/${chat.id}`)}
        >
          <AccessTimeFilledIcon />
          <div>
            <h4>{chat.title}</h4>
            <span>
              {chat.number} {chat.number === 1 ? "Message" : "Messages"}
            </span>
          </div>
        </div>
      ))}
      <TabBar />
    </div>
  );
};

export default Activity;
