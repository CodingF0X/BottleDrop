const Beverage = require("../Models/beverageModel");
const Warehouse = require("../Models/warehouseModel");

exports.createBeverage = async (req, res, next) => {
  const { beverageType, description, count } = req.body;

  try {
    const warehouse = await Warehouse.findOne();
    const beverages = warehouse.beverages;
    let newBeverages = [];
    for (let i = 0; i < count; i++) {
      const newBeverage = await Beverage.create({ beverageType, description });
      newBeverages.push(newBeverage);
      if (!beverages.has(beverageType)) {
        beverages.set(beverageType, []);
      }

      warehouse.beverages.set(beverageType, [
        ...warehouse.beverages.get(beverageType),
        newBeverage._id,
      ]);
      await warehouse.save();
    }

    res.status(200).json({ newBeverages, quantity: count });
  } catch (error) {
    next(error);
  }
};

exports.updateBeverage = async (req, res, next) => {
  const { bevType } = req.body;
  const id = req.params.id;
  try {
    const updateBeverage = await Beverage.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updateBeverage) {
      return res.status(404).json({ message: "Beverage not found" });
    }

    const updatedInventory = await Warehouse.updateOne(
      {},
      {
        $set: { [`beverages.${bevType}`]: updateBeverage },
      }
    );

    res.status(200).json(updateBeverage);
  } catch (error) {
    next(error);
  }
};

exports.deleteBeverage = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deletedBeverage = await Beverage.findByIdAndDelete(id);

    if (!deletedBeverage) {
      return res.status(404).json({ message: "Beverage not found" });
    }

    const beverageType = deletedBeverage.beverageType;
    if (!beverageType) {
      return res.status(400).json({ message: "Beverage type is undefined" });
    }
    const updatedInventory = await Warehouse.updateOne(
      {},
      {
        $pull: {
          [`beverages.${deletedBeverage.beverageType}`]: deletedBeverage._id,
        },
      }
    );
    res.status(200).json({ Message: "Beverage has been deleted" });
  } catch (error) {
    next(error);
  }
};
