const Warehouse = require("../Models/warehouseModel");

//-- CREATE WAREHOUSE INVENTORY --//
exports.createInventory = async (req, res) => {
  try {
    const newInventory = await Warehouse.create({
      beverages: new Map(),
      log: new Map(),
    });
    res.status(200).json(newInventory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//-- GET WAREHOUSE --//
exports.getWarehouse = async (req, res, next) => {
  try {
    const warehouse = await Warehouse.findOne();
    res.status(200).json(warehouse);
  } catch (error) {
    next(error);
  }
};

//-- GET ALL BEVERAGES --//
exports.getAllBeverages = async (req, res, next) => {
  try {
    const warehouse = await Warehouse.findOne({});

    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    const beverageType = warehouse.beverages.keys();

    for (key of beverageType) {
      await warehouse.populate(`beverages.${key}`);
    }

    const formattedResult = {
      beverages: warehouse.beverages,
    };
    res.status(200).json(formattedResult);
  } catch (error) {
    next(error);
  }
};
