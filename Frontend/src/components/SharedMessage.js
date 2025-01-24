import {
  Box,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { UpdateSidebarType } from "../redux/slices/app";
import { useDispatch } from "react-redux";
import { CaretLeft } from "phosphor-react";
import { faker } from "@faker-js/faker";
import { SHARED_DOCS, SHARED_LINKS } from "../data";
import { DocMsg, LinkMsg } from "./conversations/MsgTypes";

const SharedMessage = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
            <Typography variant="subtitle2">Shared Messages</Typography>
          </Stack>
        </Box>
        <Tabs
          sx={{ px: 2, pt: 2 }}
          value={value}
          onChange={handleChange}
          centered
        >
          <Tab label="Media" />
          <Tab label="Links" />
          <Tab label="Docs" />
        </Tabs>
        {/* Body */}
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}
          p={3}
          spacing={value === 1 ? 1 : 3}
        >
          {(() => {
            switch (value) {
              case 0:
                // Images
                return (
                  <Grid container spacing={2}>
                    {[0, 1, 2, 3, 4, 5, 6].map((el, ind) => {
                      return (
                        <Grid key={ind} item xs={4}>
                          <img
                            src="https://th.bing.com/th/id/OIP.BD-axKm2_LAjwrhrwg-JoAHaE8?rs=1&pid=ImgDetMain"
                            alt={faker.name.fullName()}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                );

              case 1:
                // Links

                return SHARED_LINKS.map((el, ind) => (
                  <LinkMsg el={el} key={ind} />
                ));
              case 2:
                // Docs
                return SHARED_DOCS.map((el, ind) => (
                  <DocMsg el={el} key={ind} />
                ));

              default:
                break;
            }
          })()}
        </Stack>
      </Stack>
    </Box>
  );
};

export default SharedMessage;
