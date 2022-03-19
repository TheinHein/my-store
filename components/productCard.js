import React, { useState } from "react";

import Link from "next/link";

import { useCartContext } from "../contexts/CartContext";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

import styles from "./productCard.module.css";

export default function Product(props) {
  const { addToCart } = useCartContext();

  const {
    open,
    toggleDrawer,
    name,
    description,
    unit_amount,
    _id,
    reviews,
    images,
  } = props;

  const [product, setQuantity] = useState({
    name,
    description,
    unit_amount,
    _id,
    reviews,
    quantity: "0",
  });

  const handleChange = (e) => {
    setQuantity({ ...product, quantity: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (Number(product.quantity) !== 0) {
      addToCart(product);
      setQuantity({ ...product, quantity: "0" });
      toggleDrawer(open);
    }
  };

  const value =
    product.reviews.reduce((a, b) => a + b.rating, 0) / product.reviews.length;

  return (
    <Paper elevation={3} className={styles.container}>
      <Typography variant="body2">{name}</Typography>

      <Box className={styles.titleWrapper}>
        <Link href={`/products/${product._id}`}>
          <a>
            <img src={images} className={styles.img} />
          </a>
        </Link>
      </Box>

      <Typography className={styles.description} color="text.secondary">
        {description}
      </Typography>

      <Box sx={{ display: "flex" }}>
        <Rating
          name="average-rating"
          value={value}
          precision={0.5}
          size="small"
          readOnly
        />

        <Typography variant="body2" color="text.secondary">
          {product.reviews.length}
        </Typography>
      </Box>

      <Box sx={{ fontWeight: "bold" }}>${unit_amount.value}</Box>

      <Box className={styles.addToCartWrapper}>
        <TextField
          type="number"
          inputProps={{ min: 0 }}
          variant="outlined"
          size="small"
          className={styles.quantity}
          name={_id}
          value={product.quantity}
          onChange={handleChange}
        />

        <Button className={styles.addBtn} onClick={handleAdd}>
          Add
        </Button>
      </Box>
    </Paper>
  );
}
