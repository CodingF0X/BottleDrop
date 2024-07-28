import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Stats_Left_Panel from "./Stats_Left_Panel";
import Stats_Right_Panel from "./Stats_Right_Panel";
import { useDispatch, useSelector } from "react-redux";
import { getWarehouseDetails } from "../State/State_Warehouse/warehouseThunk";
import { selectCurrentUser } from "../State/State_Auth/authSlice";
import { useParams } from "react-router";
import { getBarDetailsReducer } from "../State/State_Bar/barThunk";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const { barName } = useParams();
  const { bars } = useSelector((state) => state.bars);
  const bar = bars.find((b) => b.name === barName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.role === "Warehouse-Assistant") {
          dispatch(getWarehouseDetails());
        } else if (user.role === "Bartender") {
          console.log("get Bar Details");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch, user]);

  useEffect(() => {
    if (barName && bars.length > 0) {
      if (bar) {
        dispatch(getBarDetailsReducer(bar._id));
      }
    }
  }, [barName, bars, dispatch]);

  return (
    <Box>
      {user && user.role !== "Visitor" && (
        <Box sx={{ display: "flex", width: "80%", gap: 15, mt: 10 }}>
          <Stats_Left_Panel />
          <Stats_Right_Panel />
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
