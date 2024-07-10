const Warehouse = require("../Models/warehouseModel");

//-- CREATE WAREHOUSE INVENTORY --//
exports.createInventory = async (req,res)=>{
    try {
        const newInventory = await Warehouse.create({beverages: new Map(), log: new Map()});
        res.status(200).json(newInventory);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

//-- GET WAREHOUSE --//
exports.getWarehouse = async (req,res,next)=>{
    try {
        const warehouse = await Warehouse.findOne();
        res.status(200).json(warehouse);
    } catch (error) {
        next(error);
    }
}

//-- GET ALL BEVERAGES --//
exports.getAllBeverages = async (req,res,next)=>{
    try {
        const beverages = await Warehouse.aggregate([{
            $project: {
                beverages: 1,
                _id: 0
            }
        }])

        const formattedResult = {
            beverages: beverages.length > 0 ? beverages[0].beverages : []
        }
        res.status(200).json(formattedResult);
    } catch (error) {
        next(error);
    }
}

