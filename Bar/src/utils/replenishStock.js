const axios = require("axios");

const updateBarStock = async (barId, beverageType, recievedDrinks) => {
  try {
    const bar = await Bar.findById(barId);
    if (!bar) {
      throw new Error("Bar not found");
    }

    if (!bar.beverageStock.has(beverageType)) {
      bar.beverageStock.set(beverageType, []);
    }
    const keys = bar.beverageStock.keys();

    for (const key of keys) {
      const currentStock = bar.beverageStock.get(key);
      if (recievedDrinks[key]) {
        bar.beverageStock.set(key, currentStock.concat(recievedDrinks[key]));
      }
    }
    await bar.save();
  } catch (error) {
    console.error(`Failed to update bar stock: ${error.message}`);
  }
};

exports.replenishStock = async (bar, bevtype, quantity) => {
  try {
    //const replenishmentQty = threshold - drinks.length;
    const data = {
      quantity: quantity,
      bevtype: bevtype,
      barName: bar.name,
    };
    console.log("threshold reached");

    const response = await replenishmentBreaker.fire(data);
    console.log(response);
    await updateBarStock(bar._id, bevtype, response);
  } catch (error) {
    console.log("Threshold function error: " + error);
  }
};

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
