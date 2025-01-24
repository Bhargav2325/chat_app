import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { MagnifyingGlass } from "phosphor-react";
import { CallElement } from "../../components/CallLogElement";
import { MembersList } from "../../data";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StartCall = ({ open, handleClose }) => {
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ p: 4 }}
      >
        {/* Title */}
        <DialogTitle>
          <Typography variant="h5">Start Call</Typography>

          <Stack sx={{ width: "100%", mt: 2 }} position={"relative"}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                sx={{
                  "& input::placeholder": { color: "#709CE6", opacity: 1 },
                }}
              />
            </Search>
          </Stack>
        </DialogTitle>
        {/* Call List */}
        <DialogContent sx={{ my: 3 }}>
          {MembersList.map((el, ind) => (
            <CallElement {...el} key={ind} />
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StartCall;
