import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom"; // Import useParams to get route parameters
import { Typography } from "@mui/material";

export default function Table_BeverageDetails({ warehouse }) {
  const { type } = useParams(); // Get the beverage type from the route parameters
  const beverages = warehouse.beverages || {};
  const items = beverages[type] || [];

  const rows = items.map((item, index) => ({
    id: index + 1,
    Type: type,
    Brand: item.description.brand,
    Price: item.description.price,
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "Type", headerName: "Type", width: 130 },
    { field: "Brand", headerName: "Brand", width: 130 },
    {
      field: "Price",
      headerName: "Price",
      type: "number",
      width: 90,
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Typography variant="h6">Details for {type}</Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
