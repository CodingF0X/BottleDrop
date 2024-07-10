const mongoose = require('mongoose');
const schema  = mongoose.Schema;

const barSchema = new schema({
    name:{
        type: String,
        reuqired: true,
    }, 
    location:{
        type: String,
    },
    beverageStock:{
        type: Map,
        of: [{
            type: Object, // or keep the type as Object.Id, and send to the warehouse a post request with the beverage Ids that we want to populate
            //ref: "beverage",
        }]
    },
    orders: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "order",
        },
      ],
},{timestamps: true})

const bar = mongoose.model('bar',barSchema)

module.exports = bar