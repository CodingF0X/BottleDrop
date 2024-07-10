const mongoose = require('mongoose');

const validateObjectId = (req,res,next)=>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        const err = new Error('Invalid _id format');
        err.statusCode = 500;
        return next(err);
    }
   next()
}

module.exports = validateObjectId;