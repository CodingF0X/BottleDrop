const mongoose = require("mongoose");
const schema = mongoose.Schema;

const warehouseSchema = new schema(
  {
    beverages: {
      type: Map,
      of: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "beverage",
        },
      ],
    },

    empties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "beverage",
      },
    ],

    log: {
      type: Map,
      of:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "beverage",
      }],
    },
  },
  { strictPopulate: false },
  { timestamps: true }
);

const warehouse = mongoose.model("warehouse", warehouseSchema);

module.exports = warehouse;
