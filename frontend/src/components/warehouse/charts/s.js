export const prepareChartData = (warehouse) => {
  const beverageCount = {};

  // Iterate over the log to count occurrences of each beverage type
  for (const bar in warehouse.log) {
    warehouse.log[bar].forEach((beverageId) => {
      // Find the beverage in any beverage type category
      let beverageFound = null;   
      for (const beverageType in warehouse.beverages) {
        beverageFound = warehouse.beverages[beverageType].find(b => b._id === beverageId);
        if (beverageFound) break;  // Stop searching once we find the beverage
      }
      
      if (beverageFound) {
        const type = beverageFound.beverageType;
        if (!beverageCount[type]) {
          beverageCount[type] = 0;
        }
        beverageCount[type]++;
      }
    });
  }

  // Convert the data into Chart.js format
  const data = {
    labels: Object.keys(beverageCount),
    datasets: [{
      label: 'Beverages Sent to Bars',
      data: Object.values(beverageCount),
      backgroundColor: Object.keys(beverageCount).map((_, index) => {
        // Generate random colors for each beverage type
        const color = `hsl(${index * 60}, 70%, 70%)`;  // Example: hsl(0,70%,70%) for red, hsl(60,70%,70%) for yellow, etc.
        return color;
      }),
      hoverOffset: 4,
    }]
  };

  return data;
};
