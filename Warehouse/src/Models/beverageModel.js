const mongoose = require("mongoose");
const schema = mongoose.Schema;

const beverageSchema = new schema({
  beverageType: {
    type: String,
    required: true,
  },
  description: {
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
},{timestamps: true});

const beverage = mongoose.model('beverage', beverageSchema);

module.exports = beverage;
