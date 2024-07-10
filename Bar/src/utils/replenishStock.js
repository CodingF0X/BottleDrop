const axios = require("axios");
exports.ManuallyUpdateStock = async (barName, bevtype, quantity) => {
  try {
    const data = {
      quantity: quantity,
      bevtype: bevtype,
      barName: barName,
    };
    const response = await axios.post(
      "http://localhost:5000/api/warehouse/replenishBar",
      data
    );
    return response.data;
  } catch (error) {
    console.log("Threshold function error: " + error);
  }
};
