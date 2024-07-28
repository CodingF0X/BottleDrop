import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton, InputBase, Typography } from "@mui/material";
import { Delete, OpenInNew, Search } from "@mui/icons-material";
import { useAuth } from "../../../Hooks/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Table_Warehouse() {
  const warehouse = useSelector((state) => state.warehouse);
  const beverages = warehouse.beverages || {};
  const navigate = useNavigate();
  // Group beverages by type and count the quantity
  const createRows = (beverages) =>
    Object.entries(beverages).map(([type, items], index) => ({
      id: index + 1,
      Type: type,
      Quantity: items.length,
    }));

  const [searchValue, setSearchValue] = useState("");
  const [rows, setRows] = useState(createRows(beverages));

  useEffect(() => {
    setRows(createRows(beverages));
  }, [beverages]);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleRowClick = (params) => {
    navigate(`beverage-details/${params.row.Type}`);
  };

  const columns = [
    { field: "Type", headerName: "Type", width: 150 },
    {
      field: "Quantity",
      headerName: "Quantity",
      type: "number",
      width: 100,
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 150,
      headerAlign: "right",
      renderCell: (params) => (
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          {/* <IconButton onClick={() => handleDelete(params.row.id)}>
            <Delete />
          </IconButton> */}

          <IconButton onClick={() => handleRowClick}>
            <OpenInNew />
          </IconButton>
        </Box>
      ),
    },
  ];

  // Filtering based on search input
  const getFilteredRows = () => {
    return rows.filter((row) =>
      row.Type.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <InputBase
        placeholder="Search Beverages"
        value={searchValue}
        onChange={handleSearchInputChange}
        variant="outlined"
        id="outlined-multiline-static"
        sx={{
          maxWidth: "100%",
          backgroundColor: "white",
          borderRadius: "20px",
          border: "none",
          p: "10px",
          width: "320px",
        }}
        endAdornment={<Search sx={{ color: " #d1d1e0" }} />}
      />
      <DataGrid
        rows={getFilteredRows()}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowClick={handleRowClick}
      />
      <br />
      <br />
      <Box display={"flex"} gap={2}>
        <Typography variant="h5">Number of Empties : </Typography>
        <Typography variant="h5">{warehouse.empties.length}</Typography>
      </Box>
    </div>
  );
}
