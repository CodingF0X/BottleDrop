import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton, InputBase, Typography } from "@mui/material";
import { Delete, Search } from "@mui/icons-material";
import { useAuth } from "../../../Hooks/AuthContext";
import { useState } from "react";

const barLocations = {
    Bar_1: "By the entrance",
    Bar_2: "Central Hall",
  };

export default function Log_Table({ warehouse }) {
  const log = warehouse.log || {};
  const rows = Object.entries(log).map(([barName, drinks], index) => ({
    id: index + 1,
    barName: barName,
    location:barLocations[barName],
    totalDrinksSent: drinks.length,
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "barName", headerName: "Bar Name", width: 180 },
    { field: "location", headerName: "Location", width: 180 },
    {
      field: "totalDrinksSent",
      headerName: "Total Drinks Sent",
      type: "number",
      width: 190,
    },
  ];
  
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Typography>Inventory Record </Typography> <br />
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
