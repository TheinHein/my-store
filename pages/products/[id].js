import { getAllProductsIds, getProductData } from "../../lib/products";

import Image from "next/image";

import DetailTab from "../../components/Tabs";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

export default function Product({ productData }) {
  const avgRating =
    productData["0"].reviews.reduce((a, b) => a + b.rating, 0) /
    productData["0"].reviews.length;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ py: 3 }}>{productData["0"].name}</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Rating
            name="simple-controlled"
            defaultValue={avgRating}
            precision={0.5}
            readOnly
          />
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ fontSize: "0.8rem" }}>
              Write a review | Ask a question
            </Typography>
          </Box>
        </Box>
        <Box sx={{ py: 4 }}>
          <Image src="/images/tea-leaf-salad.jpeg" width="200" height="200" />
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "80%",
            maxWidth: "400px",
          }}
        >
          <Typography>${productData["0"].price}</Typography>
          <TextField
            id="quantity"
            label="Quantity"
            type="number"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ maxWidth: "80px" }}
          />
          <Button
            size="small"
            sx={{
              borderRadius: "18px",
              width: "100px",
              boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.2)",
              color: "black",
              fontSize: "0.7rem",
            }}
            variant="text"
          >
            Add to Cart
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            py: 1,
            width: "80%",
            maxWidth: "400px",
            justifyContent: "space-evenly",
          }}
        >
          <Button size="small">
            <ShareIcon />
            <Typography sx={{ fontSize: "0.7rem" }}>Share</Typography>
          </Button>
          <Button size="small">
            <PlaylistAddIcon />
            <Typography sx={{ fontSize: "0.7rem" }}>Add to list</Typography>
          </Button>
        </Box>
        <Divider sx={{ py: 1 }} />
      </Box>
      <DetailTab productData={productData["0"]} />
    </>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = await getAllProductsIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the product using params.id
  const productData = await getProductData(params.id);

  return {
    props: {
      productData,
    },
  };
}
