import * as React from "react";

import Link from "next/link";

import { useCartContext } from "../contexts/CartContext";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function CartDrawer(props) {
  const { cart } = useCartContext();

  const { open, toggleDrawer } = props;

  let subtotal = 0;
  if (cart.length !== 0) {
    subtotal = cart
      .reduce((a, b) => {
        return a + b.unit_amount.value * b.quantity;
      }, 0)
      .toPrecision(4);
  }

  return (
    <Drawer
      open={open}
      anchor="right"
      onClose={() => toggleDrawer(open)}
      keepMounted
      sx={{ zIndex: "2200" }}
    >
      <Box sx={{ width: 330 }} role="presentation">
        <Box sx={{ display: "flex", width: "80%", m: "auto", pt: 4, pb: 8 }}>
          <img
            src="/images/tea-leaf-salad.jpeg"
            style={{ height: "80px", width: "80px", marginRight: "8px" }}
          />

          <Typography sx={{ fontSize: 12 }} color="text.secondary">
            {cart.length !== 0 &&
              `${cart[cart.length - 1].name}-${
                cart[cart.length - 1].description
              }`}
          </Typography>
        </Box>

        <Divider
          sx={{
            width: "80%",
            m: "auto",
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "center", m: 3 }}>
          <Typography sx={{ fontSize: 15, fontWeight: "bold", mr: 3 }}>
            Cart subtotal
          </Typography>

          <Typography sx={{ fontSize: 15, fontStyle: "italic", mr: 3 }}>
            {cart.length} items
          </Typography>

          <Typography sx={{ fontSize: 15, fontWeight: "bold" }}>
            ${subtotal}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: "0 40px",
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
            <Link href="/cart">
              <a>View cart</a>
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
