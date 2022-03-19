import React from "react";

import Link from "next/link";

import { PayPalButtons } from "@paypal/react-paypal-js";

import { useCartContext } from "../contexts/CartContext";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Cart() {
  const { cart } = useCartContext();

  const products = cart;
  console.log(products);
  let totalQty = 0;
  if (cart.length !== 0) {
    totalQty = cart.reduce((a, b) => {
      return a + Number(b.quantity);
    }, 0);
  }
  let subtotal = 0;
  if (cart.length !== 0) {
    subtotal = cart.reduce((a, b) => {
      return a + b.unit_amount.value * b.quantity;
    }, 0);
  }

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: `${subtotal}`,
            breakdown: {
              item_total: {
                /* Required when including the `items` array */
                currency_code: "USD",
                value: `${subtotal}`,
              },
            },
          },
          items: products,
        },
      ],
    });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (orderData) {
      // Successful capture! For dev/demo purposes:
      console.log(
        "Capture result",
        orderData,
        JSON.stringify(orderData, null, 2)
      );
      const transaction = orderData.purchase_units[0].payments.captures[0];
      alert(
        "Transaction " +
          transaction.status +
          ": " +
          transaction.id +
          "\n\nSee console for all available details"
      );
      // When ready to go live, remove the alert and show a success message within this page. For example:
      // var element = document.getElementById('paypal-button-container');
      // element.innerHTML = '';
      // element.innerHTML = '<h3>Thank you for your payment!</h3>';
      // Or go to another URL:  actions.redirect('thank_you.html');
    });
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "space-between",
          p: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Cart</Typography>
          <Link href="/products">
            <a>Continue Shopping...</a>
          </Link>
        </Box>

        <Grid
          container
          spacing={2}
          sx={{
            flexGrow: 1,
            m: "0 auto",
            pr: 4,
          }}
        >
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography>Items in cart</Typography>
            {products.map((product) => (
              <Paper
                elevation={3}
                sx={{
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  padding: "20px",
                  height: "100px",
                }}
                key={product._id}
              >
                <Box sx={{ pr: 2 }}>
                  <img
                    src="/images/tea-leaf-salad.jpeg"
                    style={{ height: "80px", width: "80px" }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "80px",
                  }}
                >
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    {product.name}
                  </Typography>
                  <Box
                    sx={{
                      width: "200px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <TextField
                      id="standard-number"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      size="small"
                      sx={{ width: 70, paddingRight: "8px" }}
                      name={product._id}
                      value={product.quantity}
                    />
                    <Box sx={{ fontWeight: "bold" }}>
                      ${product.unit_amount.value}
                    </Box>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: "10px",
                padding: "20px",
                height: "500px",
              }}
            >
              <Button>Order Summary</Button>
              <List>
                <ListItem>
                  <ListItemText>Items({totalQty})</ListItemText>
                  <ListItemText sx={{ textAlign: "end" }}>
                    ${subtotal}
                  </ListItemText>
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <ListItemText>Subtotal</ListItemText>
                  <ListItemText sx={{ textAlign: "end" }}>
                    ${subtotal}
                  </ListItemText>
                </ListItem>
              </List>
              <List>
                <ListItem divider>
                  <ListItemText>Shipping</ListItemText>
                  <ListItemText sx={{ textAlign: "end" }}>Free</ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>Order Total</ListItemText>
                  <ListItemText sx={{ textAlign: "end" }}>
                    ${subtotal}
                  </ListItemText>
                </ListItem>
              </List>
              <Box
                sx={{
                  display: "flex",
                  height: "120px",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={onApprove}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
