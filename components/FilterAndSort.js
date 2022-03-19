import React from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

export default function FilterAndSort() {
  const [sortBy, setSortBy] = React.useState("Best Match");

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h4" sx={{ textAlign: "center", p: 2 }}>
        Foods
      </Typography>
    </Box>
  );
}
