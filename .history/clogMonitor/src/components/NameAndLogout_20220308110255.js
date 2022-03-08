import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

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
        // <Paper sx={{ width: 320 }}>
            <Box
                sx={{
                    position: 'absolute',
                    border: '0.5px solid grey',
                    borderRadius: "8%",
                    top: "2%",
                    right: "5%",
                    width: "12%",
                    height: "6%",
                    color: 'grey'
                }}
                onClick={handleClick}
            >
                <Stack direction="row" spacing={1}
                    sx={{
                        position: 'relative',
                        borderRadius: "50%",
                        top: "15%",
                        left: "2%"
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            borderRadius: "50%",
                            width: "13%",
                            left: "5%",
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Avatar
                            sx={{
                                borderRadius: "50%",
                                backgroundColor: 'red',
                            }}
                            alt="Remy Sharp"
                            src="./img_avatar.png" />
                    </Box>

                    <Stack direction="column" spacing={1}
                        sx={{
                            position: 'relative',
                            borderRadius: "50%",
                            width: "60%",
                            top: "15%",
                            left: "5%",
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: "90%"
                        }}
                    >
                        <Typography variant="body2">
                            Mark Robison
                        </Typography>
                        <Typography variant="body2">Id: 1235687</Typography>
                    </Stack>

                    <KeyboardArrowDownIcon />
                </Stack>


            </Box>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}

            >
                <MenuItem onClick={handleClose}>
                    <Stack direction="row" spacing={3}
                        sx={{
                            width: '100%',
                        }}
                    >
                        <LogoutIcon></LogoutIcon>
                        <ListItemText>Log out</ListItemText>
                    </Stack>
                </MenuItem>
            </Menu>
        // </Paper>
    );
}

export default NameAndLogout;