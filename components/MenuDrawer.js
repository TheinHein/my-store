import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";

export default function MenuDrawer(props) {
  const { open, toggleDrawer } = props;
  return (
    <Drawer
      anchor="top"
      keepMounted
      open={open}
      onClose={toggleDrawer(open)}
      sx={{
        "& .MuiPaper-root": {
          margin: "60px 30px 0 0 ",
        },
      }}
    >
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon>
          <ListItemText>Sign In</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Create Account</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Help</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>Web Clipboard</ListItemText>
        </MenuItem>
      </MenuList>
      <Box sx={{ width: "100%" }} role="presentation">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: "30px ",
            boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.6)",
          }}
        >
          <Button
            sx={{
              borderRadius: "18px",
              width: 120,
              boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.2)",
              color: "black",
            }}
            variant="text"
          >
            Chat
          </Button>

          <Button
            sx={{
              borderRadius: "18px",
              width: 120,
              boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.2)",
              color: "black",
            }}
            variant="text"
          >
            Call us
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
