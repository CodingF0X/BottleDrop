const { default: axios } = require("axios");
const Warehouse = require("../Models/warehouseModel");
const { updateLog } = require("../Utils/updateLog");

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


//-- GET SINGLE BEVERAGE --//
exports.getSingleBeverage = async (req,res,next)=>{
    const id = req.params.id
    let beverage = null;
    try {
        const warehouse  = await Warehouse.findOne();
        for(const [bevType, bevId] of warehouse.beverages){
            if(bevId.includes(id)){
                beverage = bevId
                await warehouse.populate({
                    path: `beverages.${bevType}`,
                    match: { _id: id },
                  });
            }
        }
        res.status(200).json(beverage[0]);
    } catch (error) {
        next(error)
    }
}

//-- REPLENISH BAR --//
exports.replenishBar = async (req, res, next) => {
  const { bevtype, quantity, barName } = req.body;
  try {
    const warehouse = await Warehouse.findOne().populate(`beverages.${bevtype}`);
    if (!warehouse) {
      throw new Error("Warehouse not found");
    }

    if(!warehouse.beverages.has(bevtype)){
      throw new Error("Beverage not found");
    }

    const arrDrinkType = warehouse.beverages.get(bevtype);
    if (!arrDrinkType || arrDrinkType.length === 0) {
        res.status(200).json("Drink type does not exist or is empty");
        throw new Error("Drink type does not exist or is empty")
    }
    const result = updateLog(bevtype, arrDrinkType, quantity, barName, warehouse);

    await warehouse.save();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

exports.notification = async (req, res, next) => {
  const { payload } = req.body;
  console.log(payload);
  try {  
    
    if (payload) {
      const response = await axios.get("http://localhost:7000/api/drop_point/empties")
      console.log('empties recieved')
      console.log(response.data)
     
      const warehouse = await Warehouse.findOneAndUpdate({},{
        $addToSet: {empties:response.data}
      },{new:true});

      console.log('empties in Warehouse:')
      console.log(warehouse.empties)
      res.status(200).json('Collection acknowledged');
    }
  } catch (error) {
    next(error);
  }
}
