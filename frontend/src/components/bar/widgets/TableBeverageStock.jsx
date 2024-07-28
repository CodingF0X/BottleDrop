import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton, InputBase, Typography } from "@mui/material";
import { OpenInNew, Search } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function TableBeverageStock() {
  const { bars } = useSelector((state) => state.bars);
  const navigate = useNavigate();
  const { barName } = useParams(); // Get the bar name from URL params

  const [searchValue, setSearchValue] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Find the bar with the matching name
    const selectedBar = bars.find((bar) => bar.name === barName);

    if (selectedBar) {
      // Map the beverage stock details to the rows format
      const mappedRows = selectedBar.beverageStockDetails.map(
        (item, index) => ({
          id: index,
          Type: item.Beverage_Type,
          Quantity: item.Beverages,
        })
      );
      setRows(mappedRows);
    }
  }, [barName, bars]);

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
          <IconButton onClick={() => handleRowClick(params)}>
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
        <Typography variant="h5"> Drink Types Available : </Typography>
        <Typography variant="h5">{rows.length}</Typography>
      </Box>
    </div>
  );
}
