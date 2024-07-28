import { Box, Stack } from "@mui/material";
import BeverageTypesChart from "../charts/BeverageType";
import Log_Chart from "../charts/Log_Chart";
import PieChart from "../charts/PieChart";
import { useSelector } from "react-redux";

const Stats = () => {
  const warehouse = useSelector(state=>state.warehouse)
  return (
    <div>
      <Stack spacing={4} p={2}>
        {/* Beverage Types Chart */}
        <BeverageTypesChart beverages={warehouse.beverages} />
        
        {/* Container for Log Chart and Pie Chart */}
        <Box display="flex" justifyContent="space-between">
          {/* Log Chart */}
          <Box flex={3}>
            <Log_Chart empties={warehouse.empties} log={warehouse.log} />
          </Box>

          {/* Pie Chart */}
          <Box flex={4} ml={2}>
            <PieChart log={warehouse.log} beverages={warehouse.beverages} />
          </Box>
        </Box>
      </Stack>
    </div>
  );
};

export default Stats;
