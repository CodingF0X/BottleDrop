const Beverage = require("../Models/beverageModel");
const Warehouse = require("../Models/warehouseModel");

exports.createBeverage = async (req,res,next) => {
    const { beverageType, description, count } = req.body;

    try {
        const warehouse = await Warehouse.findOne();
        const beverages = warehouse.beverages
        let newBeverages = [];
        for (let i = 0; i < count; i++) {
            const newBeverage = await Beverage.create({beverageType, description})
            newBeverages.push(newBeverage)
            if(!beverages.has(beverageType)){
                beverages.set(beverageType,[])
            }

            warehouse.beverages.set(beverageType,[...warehouse.beverages.get(beverageType),newBeverage._id])
            await warehouse.save();
        }

        res.status(200).json({ newBeverages, quantity: count });

    } catch (error) {
        next(error);
    }
}