import { Equalizer, Liquor, ViewList } from "@mui/icons-material";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectCurrentUser } from "../State/State_Auth/authSlice";

const Stats_Left_Panel = () => {
  const user = useSelector(selectCurrentUser);
  const { barName }= useParams()
  // Define different headers and links based on the user's role
  const headers = {
    "Bartender": "Bar",
    "Warehouse-Assistant": "Warehouse",
    "Stockist": "Stock",
    "Visitor": "Visitor",
  };

  const links = {
    "Bartender": [
      { to: `/bar/bars/${barName}/stats`, icon: <Equalizer />, label: "Stats" },
      { to: `/bar/bars/${barName}/inventory`, icon: <ViewList />, label: "Inventory" },
      { to: "/bar/bar_details", icon: <Liquor />, label: "Bar Details" },
    ],
    "Warehouse-Assistant": [
      { to: "/warehouse/stats", icon: <Equalizer />, label: "Stats" },
      { to: "/warehouse/inventory", icon: <ViewList />, label: "Inventory" },
      { to: "/warehouse/bars", icon: <Liquor />, label: "Bars" },
    ],
    "Stockist": [
      { to: "/stockist/stats", icon: <Equalizer />, label: "Stats" },
      { to: "/stockist/inventory", icon: <ViewList />, label: "Inventory" },
      { to: "/stockist/log", icon: <Liquor />, label: "Stock Logs" },
    ],
    "Visitor": [
      { to: "/visitor/stats", icon: <Equalizer />, label: "Stats" },
      { to: "/visitor/inventory", icon: <ViewList />, label: "Inventory" },
      { to: "/visitor/log", icon: <Liquor />, label: "Visitor Logs" },
    ],
  };

  const userRole = user?.role;
  const header = headers[userRole] || "Dashboard";
  const roleLinks = links[userRole] || [];

  return (
    <Box sx={{ display: "flex", gap: "40px", ml: "80px" }}>
      <Stack flexBasis={"40%"}>
        <Paper sx={{ pl: "15px", pr: "100px" }}>
          <Typography variant="h5">{header}</Typography>
          {roleLinks.map((link, index) => (
            <Box
              key={index}
              component={Link}
              to={link.to}
              alignItems={"center"}
              display={"flex"}
              gap={2}
            >
              <IconButton>
                {link.icon}
                <Typography>{link.label}</Typography>
              </IconButton>
            </Box>
          ))}
        </Paper>
      </Stack>
    </Box>
  );
};

export default Stats_Left_Panel;
