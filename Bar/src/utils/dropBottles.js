const { emptyBottlesBreaker } = require("../config/serviceHelper");

const collectBottles = async (emptyBottles) =>{
    console.log(emptyBottles)
    try {
        const response = await emptyBottlesBreaker.fire({emptyBottles});
        console.log(response)
    } catch (error) {
        console.log(error);
    } 
    
}

module.exports = collectBottles;
