import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Box, Container, Dialog, DialogTitle, DialogContent, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addBeverageToWarehouse } from "../../State/State_Warehouse/warehouseThunk";
import { useParams } from "react-router";
import {
  getAllBars,
  relpenishBarReducer,
} from "../../State/State_Bar/barThunk";

const ReplenishBarForm = () => {
  const dispatch = useDispatch();
  const { barName } = useParams();
  const { status, bars, error } = useSelector((state) => state.bars);
  const bar = bars.find((b) => b.name === barName);

  const [bevtype, setBevtype] = useState("");
  const [quantity, setQuantity] = useState("");
  const [openErrorDialog, setOpenErrorDialog] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
        bevtype,
      quantity: parseInt(quantity, 10),
    };
    dispatch(relpenishBarReducer({ data, id: bar._id }));

    console.log(data);
    console.log(barName);
    console.log(bars);
    console.log(bar._id);
  };

  useEffect(() => {
    if (error) {
      setOpenErrorDialog(true);
    }
  }, [error]);

  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };
  
  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          color: "#333",
          fontWeight: "bold",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        Send Replenishment Request to Warehouse
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        sx={{ mt: 2 }}
      >
        {/* Beverage Type */}
        <TextField
          fullWidth
          margin="normal"
          label="Beverage Type"
          value={bevtype}
          onChange={(e) => setBevtype(e.target.value)}
          required
        />

        {/* Brand */}
        <TextField
          fullWidth
          margin="normal"
          label="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          {status === "loading" ? "Adding..." : "Add Beverage"}
        </Button>
      </Box>

      <Dialog open={openErrorDialog} onClose={handleCloseErrorDialog} fullWidth maxWidth="sm">
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Alert severity="error">{error}</Alert>
        </DialogContent>
        <Button onClick={handleCloseErrorDialog} color="primary">
          Close
        </Button>
      </Dialog>
    </Container>
  );
};

export default ReplenishBarForm;
