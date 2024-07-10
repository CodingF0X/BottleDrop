const Bar = require("../Models/barModel");

//-- CREATE NEW BAR --//
exports.createBar = async (req, res, next) => {
  const { name, location } = req.body;

  try {
    const bar = await Bar.create({
      name,
      location,
      beverageStock: new Map(),
    });

    res.status(200).json(bar);
  } catch (error) {
    next(error);
  }
};

//-- GET ALL BARs --//
exports.getAllBars = async (req, res, next) => {
  try {
    const bars = await Bar.find();
    res.status(200).json(bars);
  } catch (error) {
    next(error);
  }
};

//-- GET BAR --//
exports.getBarDetails = async (req, res, next) => {
  const id = req.params.id;
  try {
    const bar = await Bar.findById(id);
    //const existingKeys = keys.filter((key) => bar.beverageStock.has(key));
    // let result = {};
    // existingKeys.forEach((key) => {
    //   if (bar.beverageStock.has(key)) {
    //     result[key] = [];
    //     var existingBeverages = bar.beverageStock.get(key);
    //     var newBeverages = beverages[key];
    //     if (newBeverages) {
    //       const newBeverageIds = newBeverages;
    //       bar.beverageStock.set(key, newBeverageIds);
    //     }
    //   }
    //   result[key].push(newBeverages);
    // });

    // for (const key of bevBarKeys){
    //   console.log(key.length) // if the length of a particular drink falls below 10, then send a request to the Warehouse

    // }
    // const inStock = keys.every(key=> bevBar.has(key)) //dummy check against Warehouse to know whether we have certain drink types

    res.status(200).json({
      bar,
      // "Beverage details ": result,
    });
  } catch (error) {
    next(error);
  }
};

//-- UPDATE BEVERAGE STOCK --//
exports.updateStock = async (req, res, next) => {
  const id = req.params.id;
  const { bevType, qty } = req.body;
  try {
    const bar = await Bar.findById(id);
    if (!bar) {
      return res.status(500).json("Bar not found");
    }

    const result = await ManuallyUpdateStock(bar.name, bevtype, quantity);

    const keys = bar.beverageStock.keys();

    if (!bar.beverageStock.has(bevType)) {
      bar.beverageStock.set(bevType, []);
    }

    for (const key of keys) {
      const currentStock = bar.beverageStock.get(key);
      if (result[key]) {
        bar.beverageStock.set(key, currentStock.concat(result[key]));
      }
    }

    await bar.save();

    res.status(200).json(bar);
  } catch (error) {
    next(error);
  }
};
