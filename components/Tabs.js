import * as React from "react";
import { useState } from "react";

import axios from "axios";

import ReviewForm from "./reviewForm";

import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FormControl, FormHelperText, TextareaAutosize } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={index}
      aria-labelledby={index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: { index },
    "aria-controls": { index },
  };
}

export default function DetailTab(props) {
  const { productData } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [rating, setRating] = useState(1);
  const handleRating = (e) => {
    setRating(e.target.value);
  };
  const [body, setBody] = useState("");
  const handleBody = (e) => {
    setBody(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    submitReview();
  };
  const submitReview = async () => {
    axios({
      method: "POST",
      url: `http://localhost:8080/api/products/${productData._id}/review`,
      header: {},
      data: { rating, body },
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [openReviewForm, setOpenReviewForm] = React.useState(false);

  const handleClickOpenReviewForm = () => {
    setOpenReviewForm(true);
  };

  const handleCloseReviewForm = () => {
    setOpenReviewForm(false);
  };
  return (
    <Box sx={{ bgColor: "background.paper", width: "100%" }}>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="tabs"
        >
          <Tab label="Details" {...a11yProps(0)} />
          <Tab label="Reviews" {...a11yProps(1)} />
          <Tab label="Q&amp;A" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Typography variant="h4" sx={{ py: 1 }}>
          Details
        </Typography>
        <Typography>{productData.detail}</Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h4" sx={{ py: 1 }}>
          Reviews
        </Typography>
        <Button
          sx={{
            borderRadius: "18px",
            width: "150px",
            boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.2)",
            color: "black",
          }}
          variant="text"
          onClick={handleClickOpenReviewForm}
        >
          Write a review
        </Button>
        {productData.reviews.map((review) => (
          <Typography>{review.body}</Typography>
        ))}

        <ReviewForm
          body={body}
          rating={rating}
          open={openReviewForm}
          handleBody={handleBody}
          handleRating={handleRating}
          handleSubmit={handleSubmit}
          handleCloseReviewForm={handleCloseReviewForm}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "300px",
          }}
        >
          <Typography variant="h4" sx={{ py: 1 }}>
            Questions & Answers
          </Typography>
          <FormControl>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                height: "200px",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <label htmlFor="display-name">Display name: </label>
                <input type="text" name="name" id="display-name" />
              </Box>

              <FormHelperText id="questions-and-answers">
                Be the first to ask a question
              </FormHelperText>
              <TextareaAutosize
                id="question"
                aria-describedby="questions-and-answers"
                placeholder="Start typing your question."
                style={{ width: "100%" }}
                minRows={5}
                maxRows={5}
              />
            </Box>
            <Button
              sx={{
                borderRadius: "18px",
                width: "150px",
                boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.2)",
                color: "black",
              }}
              variant="text"
            >
              Submit
            </Button>
          </FormControl>
        </Box>
      </TabPanel>
    </Box>
  );
}
