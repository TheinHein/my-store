import React from "react";

import Link from "next/link";

import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import StoreIcon from "@mui/icons-material/Store";

export default function Footer() {
  return (
    <Box>
      <Accordion
        sx={{
          backgroundColor: "black",
          color: "white",
        }}
        square
        disableGutters
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            borderBottom: "0.5px solid rgba(150,150,150,0.5)",
          }}
        >
          <Typography>Customer Service</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Link href="#">
            <a>Help Center</a>
          </Link>
        </AccordionDetails>
        <AccordionDetails>
          <Link href="#">
            <a>Returns</a>
          </Link>
        </AccordionDetails>
        <AccordionDetails>
          <Link href="#">
            <a>Contact Us</a>
          </Link>
        </AccordionDetails>

        <AccordionDetails>
          <Link href="#">
            <a>Shipping</a>
          </Link>
        </AccordionDetails>

        <AccordionDetails>
          <Link href="#">
            <a>Legal & Policies</a>
          </Link>
        </AccordionDetails>

        <AccordionDetails>
          <Link href="#">
            <a>Privacy & Security</a>
          </Link>
        </AccordionDetails>

        <AccordionDetails>
          <Link href="#">
            <a>Feedback</a>
          </Link>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          backgroundColor: "black",
          color: "white",
        }}
        disableGutters
        square
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{
            borderBottom: "0.5px solid rgba(150,150,150,0.5)",
          }}
        >
          <Typography>Company Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Link href="#">
            <a>About Us</a>
          </Link>
        </AccordionDetails>
      </Accordion>

      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", pr: 5 }}>
          <StoreIcon sx={{ fontSize: "3rem" }} />
          <Typography sx={{ fontSize: "2rem" }}>WE Store</Typography>
        </Box>
        <Box sx={{ pl: 5 }}>
          <Typography>Join us on</Typography>

          <FacebookIcon />
          <TwitterIcon />
          <PinterestIcon />
        </Box>
      </Box>
      <Box sx={{ textAlign: "center", p: 2 }}>
        <Typography gutterBottom color="text.secondary">
          This website is intended for personal use by US residents only. See
          our delivery policy for full details. Copyright 2021, WE Store, All
          Rights Reserved.
        </Typography>
        <Typography color="text.secondary">
          Feedback | Privacy Notice | Terms & Conditions | Cookie Preferences |
          Do Not Sell My Personal Information | California Notice
        </Typography>
      </Box>
    </Box>
  );
}
