const Bar = require("../Models/barModel");

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
