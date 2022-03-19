import * as React from "react";

import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";

export default function ReviewForm(props) {
  const {
    open,
    handleSubmit,
    handleBody,
    handleRating,
    handleCloseReviewForm,
    rating,
    body,
  } = props;

  return (
    <Dialog onClose={handleCloseReviewForm} open={open}>
      <DialogTitle>Write a review</DialogTitle>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            px: 2,
          }}
        >
          <Rating
            name="simple-controlled"
            defaultValue={1}
            precision={0.5}
            id="rating"
            name="rating"
            value={rating}
            onChange={handleRating}
            sx={{ pb: 1 }}
          />
          <TextField
            multiline
            rows={4}
            defaultValue="Default Value"
            name="body"
            id="body"
            placeholder="Type your review"
            value={body}
            onChange={handleBody}
          />
          <Button
            sx={{
              borderRadius: "18px",
              m: 2,
              boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.2)",
              color: "black",
            }}
            variant="text"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Dialog>
  );
}
