import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import "./NameAndLogout.css";

function NameAndLogout(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Box
        className="NameAndLogoutOutline"
        onClick={handleClick}
      >
        <Stack
          direction="row"
          spacing={1}
          className="NameAndLogoutLayout"
        >
          <Avatar
            className="NameAndLogoutAvatar"
            alt="Remy Sharp"
            src="./img_avatar.png"
          />

          <Stack
            direction="column"
          >
            <Typography variant="body2" color={"white"}>Mark Robison</Typography>
            <Typography variant="body2" color={"white"}>ID: 1235687</Typography>
          </Stack>

          <KeyboardArrowDownIcon style={{color: "white"}} />
        </Stack>
      </Box>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Stack
            direction="row"
            spacing={3}
            sx={{
              width: "100%",
            }}
          >
            <LogoutIcon></LogoutIcon>
            <ListItemText>Log out</ListItemText>
          </Stack>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default NameAndLogout;
