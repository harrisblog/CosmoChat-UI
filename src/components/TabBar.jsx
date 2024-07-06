import React from "react";
import "./TabBar.css";
import { Button } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useNavigate } from "react-router-dom";

const TabBar = () => {
  const navigate = useNavigate();
  return (
    <div id="tabbar">
      <Button
        variant="contained"
        startIcon={<MessageIcon />}
        onClick={() => navigate(`/chat/${Date.now()}`)}
      >
        Start A New Chat
      </Button>
      <Button
        variant="outlined"
        startIcon={<AssessmentIcon />}
        onClick={() => navigate("/activity")}
      >
        My Activity
      </Button>
    </div>
  );
};

export default TabBar;
