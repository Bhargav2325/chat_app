import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { UpdateSidebarType } from "../redux/slices/app";
import { useDispatch } from "react-redux";
import { CaretLeft } from "phosphor-react";
import Message from "./conversations/Message";

const StarredMessage = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        {/* Header */}
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
          }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            p={2}
            sx={{ height: "100%" }}
            spacing={2}
          >
            <IconButton
              onClick={() => {
                dispatch(UpdateSidebarType("CONTACT"));
              }}
            >
              <CaretLeft size={24} />
            </IconButton>
            <Typography variant="subtitle2">Starred Messages</Typography>
          </Stack>
        </Box>

        {/* Body */}
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}
          p={3}
          spacing={3}
        >
          <Message />
        </Stack>
      </Stack>
    </Box>
  );
};

export default StarredMessage;
