const { default: axios } = require("axios");

const collectBottles = async (emptyBottles) =>{
    console.log(emptyBottles)
    try {
        const response = await axios.put("http://localhost:7000/api/drop_point",{emptyBottles})
        console.log(response.data)
    } catch (error) {
        console.log(error);
    } 
    
}

module.exports = collectBottles;
