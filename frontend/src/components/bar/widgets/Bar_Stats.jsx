import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BarPieChart from "./charts/BarPieChart";

const BarStats = () => {
  const { bars } = useSelector(state => state.bars);
  const { barName } = useParams(); 
  const [selectedBar, setSelectedBar] = useState(null);

  useEffect(() => {
    const bar = bars?.find(b => b.name === barName);
    setSelectedBar(bar);
  }, [barName, bars]);

  if (!selectedBar) return <div>Loading...</div>;

  return (
    <div>
      <Stack spacing={4} p={2}>        
        {/* Container for Log Chart and Pie Chart */}
        <Box display="flex" justifyContent="space-between">
          {/* Pie Chart */}
          <Box flex={4} ml={2}>
            other charts
          </Box>
        </Box>

        {/* Doughnut Chart */}
        <BarPieChart selectedBar={selectedBar} />
      </Stack>
    </div>
  );
};

export default BarStats;
