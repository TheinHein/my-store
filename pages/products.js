import * as React from "react";

import { useState } from "react";

import axios from "axios";

import { styled, alpha } from "@mui/material/styles";
import FilterAndSort from "../components/FilterAndSort";
import ProductCard from "../components/productCard";
import CartDrawer from "../components/CartDrawer";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "15px",
  boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.2)",
  maxWidth: "200px",
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginRight: theme.spacing(2),

  width: "45%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: "0",
  top: "0",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0.5)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Products(props) {
  const { products } = props;

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (open) => {
    setOpen(!open);
  };

  const [searchValue, setSearchValue] = useState({
    products: [],
    product: {},
    isProductViewOn: false,
    sortValue: "",
    inputValue: "",
  });

  const search = (e) => {
    setSearchValue({ inputValue: e.target.value });
  };

  const filteredProducts = products
    .filter((product) => {
      return product.name
        .toLowerCase()
        .includes(searchValue.inputValue.toLowerCase());
    })
    .map((product) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
        <ProductCard open={open} toggleDrawer={toggleDrawer} {...product} />
      </Grid>
    ));

  const [sortBy, setSortBy] = React.useState("Best Match");

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          p: 1,
          backgroundColor: "black",
          width: "100vw",
        }}
      >
        <Search>
          <StyledInputBase
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
            value={searchValue.inputValue}
            onChange={search}
          />
          <SearchIconWrapper>
            <SearchIcon sx={{ color: "orange" }} />
          </SearchIconWrapper>
        </Search>
      </Box>

      <FilterAndSort />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          p: 1,
          backgroundColor: "black",
          width: "100vw",
        }}
      >
        <Button
          size="small"
          sx={{
            borderRadius: "18px",
            minWidth: 100,
            height: "30px",
            boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.2)",
            color: "black",
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "rgba(200,200,200,1)",
            },
          }}
          variant="text"
        >
          <FilterListIcon />
          Filters
        </Button>

        <FormControl sx={{ minWidth: 20 }}>
          <Select
            value={sortBy}
            onChange={handleChange}
            inputProps={{ "aria-label": "sort by" }}
            sx={{ height: 30, backgroundColor: "white", fontSize: "0.8rem" }}
          >
            <MenuItem value="Best Match">Best Match</MenuItem>
            <MenuItem value="Price: Low to High">Price: Low to High</MenuItem>
            <MenuItem value="Price: High to Low">Price: High to Low</MenuItem>
            <MenuItem value="Top Rating">Top Rating</MenuItem>
            <MenuItem value="New Arrivals">New Arrivals</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          width: "100vw",
          pb: 5,
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
      >
        <Grid
          container
          spacing={2}
          width={{ xs: 1, sm: 1, md: 1, lg: 3 / 4, xl: 1 / 2 }}
          sx={{
            flexGrow: 1,
            m: "0 auto",
            pr: "16px",
          }}
        >
          {filteredProducts}
        </Grid>
      </Box>

      <CartDrawer open={open} toggleDrawer={toggleDrawer} />
    </>
  );
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get products
  const res = await axios.get("http://localhost:8080/api/products");
  const { products } = res.data;

  // By returning { props: { products } }, the products component
  // will receive `products` as a prop at build time
  return {
    props: {
      products,
    },
  };
}
