import { Box } from "@mui/system";
import React from "react";
import Table_Warehouse from "./warehouse/widgets/Table_Warehouse";
import { useLocation, useParams } from "react-router-dom";
import Log_Table from "./warehouse/widgets/Log_Table";
import Stats from "./warehouse/widgets/Stats";
import Table_BeverageDetails from "./warehouse/widgets/Table_BeverageDetails";
import { useSelector } from "react-redux";
import BeverageForm from "./warehouse/BeverageForm";
import { selectCurrentUser } from "../State/State_Auth/authSlice";
import Bar_Stats from "./bar/widgets/Bar_Stats";
import TableBeverageStock from "./bar/widgets/TableBeverageStock";
import ReplenishBarForm from "./bar/ReplenishBarForm";

const Stats_Right_Panel = ({ drop_point }) => {
  const location = useLocation();
  const { type, barName } = useParams();
  const warehouse = useSelector((state) => state.warehouse);
  const bar = useSelector((state) => state.bars);
  const user = useSelector(selectCurrentUser);
  if (!warehouse || Object.keys(warehouse).length === 0) {
    return <p>No data available</p>; // or another fallback UI
  }

  const renderWarehouseContent = (path) => {
    switch (path) {
      case "/warehouse/stats":
        return <Stats warehouse={warehouse} />;
      case "/warehouse/inventory":
        return (
          <Box display={"flex"} gap={9}>
            <Table_Warehouse warehouse={warehouse} />
            <BeverageForm />
          </Box>
        );
      case `/warehouse/inventory/beverage-details/${type}`:
        return <Table_BeverageDetails warehouse={warehouse} />;
      case "/warehouse/bars":
        return <Log_Table warehouse={warehouse} />;
      case "/warehouse/log":
        return <Box>Logs</Box>;
      default:
        return <>ds</>;
    }
  };

  const renderBarContent = (path) => {
    switch (path) {
      case `/bar/bars/${barName}/stats`:
        return <Bar_Stats />;
      case `/bar/bars/${barName}/inventory`:
        return (
          <Box display={"flex"} gap={9}>
            <TableBeverageStock />
            <ReplenishBarForm />
          </Box>
        );
      case "/bar/details":
        return <Box>Bar Details</Box>;
      // Add more cases for bar routes if needed
      default:
        return <Box>Default page</Box>;
    }
  };

  // const renderDrop_PointContent = (path) => {
  //   switch (path) {
  //     case "/stockist/stats":
  //       return <StockistStats stockist={stockist} />;
  //     case "/stockist/table":
  //       return <StockistTable stockist={stockist} />;
  //     // Add more cases for stockist routes if needed
  //     default:
  //       return <StockistStats stockist={stockist} />;
  //   }
  // };

  const renderContentBasedOnRole = () => {
    switch (user && user.role) {
      case "Warehouse-Assistant":
        return renderWarehouseContent(location.pathname);
      case "Bartender":
        return renderBarContent(location.pathname);
      // Add cases for other roles like Stockist, Visitor, etc.
      default:
        return <Box>Default page for all other roles</Box>;
    }
  };

  return <Box flexBasis={"70%"}>{renderContentBasedOnRole()}</Box>;
};

export default Stats_Right_Panel;
