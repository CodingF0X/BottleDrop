const Warehouse = require("../Models/warehouseModel");

exports.createInventory = async (req,res)=>{
    try {
        const newInventory = await Warehouse.create({beverages: new Map(), log: new Map()});
        res.status(200).json(newInventory);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
