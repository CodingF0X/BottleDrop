const Bar = require("../Models/barModel");
const Order = require("../Models/orderModel");
const { replenishStock } = require("../utils/replenishStock");

// Make new order.
// the sequence of actions:
// check if the beverage type exists in the bar.
// if yes, make the order.
// then delete the drink from DB.
// then check if the drinks array of that particular type has reached the threshold.
// if so, send request to warehouse.
exports.createOrder = async (req, res, next) => {
  const { items } = req.body;
  const barId = req.params.barId;

  let totalCost = 0;
  const orderItems = [];
  let allBeverageIDs = [];
  const THRESHOLD = 7;
  try {
    const bar = await Bar.findById(barId);
    if (!bar) {
      throw new Error("Bar not found");
    }

    if (items && items.length === 0) {
      throw new Error("No order items(s)");
    }

    for (const item of items) {
      const { beverageType, qty } = item;

      const beveragesArray = bar.beverageStock.get(beverageType);
      if (!beveragesArray || beveragesArray.length === 0) {
        throw new Error("Beverage not found");
      }

      let remainingQty = qty;
      const beverageIDs = [];

      for (let i = beveragesArray.length - 1; i >= 0 && remainingQty > 0; i--) {
        //iterates backward through the beveragesArray, starting from the last element
        const beverage = beveragesArray[i];
        const itemPrice = beverage.description.price;
        const count = Math.min(remainingQty, 1); // each beverage object represents one unit
        //If remainingQty is greater than or equal to 1, count will be 1.
        //If remainingQty is less than 1 (which means it would be 0), count will be 0.
        for (let j = 0; j < count; j++) {
          beverageIDs.push(beverage._id);
          totalCost += itemPrice;
        }

        remainingQty -= count; //to decreases remainingQty by count, which is 1. This reflects the fact that one unit of the current beverage has been processed

        if (count > 0) {
          beveragesArray.splice(i, 1); // to delete the drink from the array after each iteration. this later will be reflected in the DB.
        }
      }

      if (remainingQty > 0) {
        throw new Error(
          `Insufficient quantity for beverage type: ${beverageType}`
        );
      }

      allBeverageIDs = allBeverageIDs.concat(beverageIDs); // Collect all IDs

      console.log(beverageIDs);
      orderItems.push({
        beverageType,
        beverages: beverageIDs,
        qty,
        price: beveragesArray[beveragesArray.length - 1].description.price,
      });

      if (beveragesArray.length <= THRESHOLD) {
        replenishStock(bar, beverageType, 10); // Request 10 more drinks of the given type
      }
    }

    const newOrder = await Order.create({
      items: orderItems,
      totalCost,
    });

    bar.orders.push(newOrder._id);
    await bar.save();

    // setTimeout(()=> collectBottles(allBeverageIDs),5000)
    // // const timeout = setTimeout(collectBottles,5000)
    // //clearTimeout(timeout)

    const response = await Order.findById(newOrder._id) // to send the reciept to the client withoout the objectIDs
      .select("-items.beverages")
      .lean();

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
