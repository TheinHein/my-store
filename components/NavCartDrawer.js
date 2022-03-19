import * as React from "react";

import Link from "next/link";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function NavCartDrawer(props) {
  const { open, toggleDrawer, cart } = props;

  let subtotal = 0;
  if (cart.length !== 0) {
    subtotal = cart
      .reduce((a, b) => {
        return a + b.unit_amount.value * b.quantity;
      }, 0)
      .toPrecision(4);
  }
  let totalQty = 0;
  if (cart.length !== 0) {
    totalQty = cart.reduce((a, b) => {
      return a + Number(b.quantity);
    }, 0);
  }
  return (
    <Drawer
      anchor="top"
      keepMounted
      open={open}
      onClose={toggleDrawer(open)}
      sx={{
        "& .MuiPaper-root": {
          margin: "60px auto",
          width: "90%",
          borderRadius: "0 0 15px 15px",
        },
      }}
    >
      <Box sx={{ width: "100%" }} role="presentation">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: "25px 20px",
          }}
        >
          <Typography variant="body1">
            Subtotal:${subtotal}({totalQty} items)
          </Typography>
          <Typography>Free shipping on this order!</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "55vh",
            overflowY: "scroll",
            backgroundColor: "rgba(0,0,0,0.2)",
          }}
        ></Box>

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
            onClick={toggleDrawer(open)}
          >
            <Link href="/cart">
              <a>View Cart</a>
            </Link>
          </Button>

          <Button
            sx={{
              borderRadius: "18px",
              width: 120,
              boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.2)",
              color: "black",
              backgroundColor: "orange",
              "&:hover": { backgroundColor: "darkorange" },
            }}
            variant="text"
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
