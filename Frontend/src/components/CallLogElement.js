import { faker } from "@faker-js/faker";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import StyledBadge from "./StyledBadge";
import {
  ArrowDownRight,
  ArrowUpRight,
  Phone,
  VideoCamera,
} from "phosphor-react";

const CallLogElement = ({ online, incoming, missed }) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          borderRadius: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? "#fff"
              : theme.palette.background.default,
        }}
        p={2}
      >
        <Stack
          direction={"row"}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={2}>
            {online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  alt={faker.name.fullName()}
                  src={faker.image.avatar()}
                />
              </StyledBadge>
            ) : (
              <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
            )}
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">
                {faker.name.fullName()}
              </Typography>

              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                {incoming ? (
                  <ArrowDownRight color={missed ? "red" : "green"} />
                ) : (
                  <ArrowUpRight color={missed ? "red" : "green"} />
                )}
                <Typography variant="caption">Yesterday, 21:24</Typography>
              </Stack>
            </Stack>
          </Stack>
          <IconButton>
            <Phone style={{ color: "green" }} />
          </IconButton>
        </Stack>
      </Box>
    </>
  );
};

const CallElement = ({ online }) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          borderRadius: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? "#fff"
              : theme.palette.background.default,
        }}
        p={2}
      >
        <Stack
          direction={"row"}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={2}>
            {online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  alt={faker.name.fullName()}
                  src={faker.image.avatar()}
                />
              </StyledBadge>
            ) : (
              <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
            )}
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">
                {faker.name.fullName()}
              </Typography>
              <Typography variant="caption">Yesterday, 21:24</Typography>
            </Stack>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <IconButton>
              <Phone style={{ color: "green" }} />
            </IconButton>
            <IconButton>
              <VideoCamera style={{ color: "green" }} />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export { CallElement, CallLogElement };
