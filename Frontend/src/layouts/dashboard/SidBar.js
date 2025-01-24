import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Images/logo.ico";
import { Nav_Buttons, Nav_Setting, Profile_Menu } from "../../data/index";
import AntSwitch from "../../components/AntSwitch";
import useSettings from "../../hooks/useSettings";
import { faker } from "@faker-js/faker";

const getPath = (index) => {
  switch (index) {
    case 0:
      return "/app";

    case 1:
      return "/group";

    case 2:
      return "/call";

    case 3:
      return "/settings";

    default:
      break;
  }
};

const getMenuPath = (index) => {
  switch (index) {
    case 0:
      return "/profile";

    case 1:
      return "/settings";
    case 2:
      // TODO => Update token & set isAuth = false
      return "/auth/login";

    default:
      break;
  }
};

const SideBar = () => {
  const theme = useTheme();
  // const dispatch = useDispatch();

  const navigate = useNavigate();

  const { onToggleMode } = useSettings();

  const [selected, setSelected] = useState(0);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        p={2}
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          height: "100vh",
          width: 100,
        }}
      >
        <Stack
          direction={"column"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ height: "100%" }}
        >
          <Stack alignItems={"center"} spacing={4}>
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                height: 64,
                width: 64,
                borderRadius: 1.5,
              }}
            >
              <img src={Logo} alt="Chat app logo" />
            </Box>
            {Nav_Buttons.map((el, index) => {
              return el.index === selected ? (
                <Box
                  key={el.index}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                  p={1}
                >
                  <IconButton sx={{ width: "max-content", color: "#ffffff" }}>
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  key={el.index}
                  onClick={() => {
                    setSelected(el.index);
                    navigate(getPath(el.index));
                  }}
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "light"
                        ? "#080707"
                        : theme.palette.text.primary,
                  }}
                >
                  {el.icon}
                </IconButton>
              );
            })}
            <Divider sx={{ width: 48 }} />
            {Nav_Setting.map((el, index) => {
              return el.index === selected ? (
                <Box
                  key={el.index}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                  p={1}
                >
                  <IconButton sx={{ width: "max-content", color: "#ffffff" }}>
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  key={el.index}
                  onClick={() => {
                    setSelected(3);
                    navigate(getPath(3));
                  }}
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "light"
                        ? "#080707"
                        : theme.palette.text.primary,
                  }}
                >
                  {el.icon}
                </IconButton>
              );
            })}
          </Stack>
          <Stack spacing={4}>
            <AntSwitch
              defaultChecked={theme.palette.mode === "dark"}
              onChange={onToggleMode}
            />
            <Avatar
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              alt={faker.name.fullName()}
              src={faker.image.avatar()}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Stack spacing={2} px={1}>
                {Profile_Menu.map((el, ind) => (
                  <MenuItem
                    key={ind}
                    onClick={() => {
                      handleClick();
                      navigate(getMenuPath(ind));
                    }}
                  >
                    <Stack
                      onClick={() => {
                        navigate(getMenuPath(ind));
                      }}
                      sx={{ width: 100 }}
                      direction="row"
                      alignContent={"center"}
                      justifyContent={"space-between"}
                    >
                      <span>{el.title}</span>
                      {el.icon}
                    </Stack>
                  </MenuItem>
                ))}
              </Stack>
            </Menu>

            {/* Profile Menu */}
            {/* <ProfileMenu /> */}
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default SideBar;
