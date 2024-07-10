const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderSchema = new schema(
  {
    //   customerID: {
    //     type: mongoose.schema.Types.ObjectId,
    //     required: true,
    //   },

    items: [
      {
        beverageType: { type: String, required: true },
        beverages: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "beverage",
          //required: true,
        }],
        qty: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    totalCost: {
      type: Number,
      required: true,
    },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const order = mongoose.model("order", orderSchema);

module.exports = order;
