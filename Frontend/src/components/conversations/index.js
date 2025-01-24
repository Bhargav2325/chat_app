import { Box, Stack } from "@mui/material";
import React from "react";
import { ChatHeader, ChatFooter } from "../Chat/index";
import Message from "./Message";
import { useTheme } from "@mui/material/styles";

const Conversation = () => {
  const theme = useTheme();
  return (
    <Stack
      sx={{ height: "100%", width: "auto" }}
      maxHeight="100vh"
      justifyContent={"space-between"}
    >
      {/* Chat Header */}
      <ChatHeader />
      {/* Msg */}
      <Box
        width={"100%"}
        sx={{
          flexGrow: 1,
          overflowY: "scroll",
          height: "100%",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background.paper,
        }}
      >
        <Message menu={true}/>
      </Box>
      {/* Chat Footer */}
      <ChatFooter />
    </Stack>
  );
};

export default Conversation;
