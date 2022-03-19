import * as React from "react";

import Link from "next/link";

import { useCartContext } from "../contexts/CartContext";

import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StoreIcon from "@mui/icons-material/Store";
import FastfoodIcon from "@mui/icons-material/Fastfood";

import NavCartDrawer from "./NavCartDrawer";
import MenuDrawer from "./MenuDrawer";

export default function NavBar(props) {
  const { cart } = useCartContext();

  const [open, setOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);

  let totalQty = 0;
  if (cart.length !== 0) {
    totalQty = cart.reduce((a, b) => {
      return a + Number(b.quantity);
    }, 0);
  }

  const toggleDrawer = (open) => (event) => {
    setOpen(!open);
    setOpenMenu(false);
  };

  const toggleMenuDrawer = (open) => (event) => {
    setOpenMenu(!open);
    setOpen(false);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "orange", zIndex: "2000" }}
      >
        <Toolbar>
          <Link href="/">
            <a>
              <Button size="large" color="inherit" aria-label="home page">
                <StoreIcon fontSize="large" />
              </Button>
            </a>
          </Link>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              sx={{ color: "white" }}
              onClick={toggleMenuDrawer(openMenu)}
            >
              <Typography
                variant="body2"
                noWrap
                component="div"
                sx={{ display: { sm: "block" } }}
              >
                Menu
              </Typography>
              <KeyboardArrowDownIcon fontSize="small" />
            </Button>
            {openMenu && (
              <Box
                sx={{
                  backgroundColor: "white",
                  borderBottom: "4px solid white",
                  borderRadius: "5px 5px 0 0",
                  mt: "9px",
                  mb: "-14px",
                  ml: "-15px",
                  width: 50,
                }}
              ></Box>
            )}
          </Box>

          <Link href="/products">
            <a sx={{ display: "flex", flexDirection: "row" }}>
              <Button size="large" color="inherit" aria-label="product page">
                <FastfoodIcon />
                <Typography
                  variant="body2"
                  noWrap
                  component="div"
                  sx={{ display: { sm: "block" } }}
                >
                  Foods
                </Typography>
              </Button>
            </a>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                borderRadius: "50%",
              }}
            >
              <IconButton
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                onClick={toggleDrawer(open)}
                color="inherit"
              >
                <Badge badgeContent={totalQty} color="info">
                  <ShoppingCartTwoToneIcon />
                </Badge>
              </IconButton>
            </Box>
            {open && (
              <Box
                sx={{
                  backgroundColor: "white",
                  borderBottom: "4px solid white",
                  borderRadius: "5px 5px 0 0",
                  mt: "1px",
                  mb: "-6px",
                  width: 40,
                }}
              ></Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <DrawerHeader />

      <NavCartDrawer open={open} toggleDrawer={toggleDrawer} cart={cart} />
      <MenuDrawer open={openMenu} toggleDrawer={toggleMenuDrawer} />
    </Box>
  );
}
