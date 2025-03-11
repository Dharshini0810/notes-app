const { constants } = require("../constants")

const errorHandler = async (err,req,res,next) =>{
    const statusCode = res.statusCode?res.statusCode : 500
    switch(statusCode){
        case constants.NOT_FOUND:
            res.status(constants.NOT_FOUND).json({title : 'Not found',message : err.message,stackTrace : err.stack})
            break;
        case constants.UNAUTHORIZED:
            res.status(constants.UNAUTHORIZED).json({title : 'Unauthorized Access',message : err.message,stackTrace : err.stack})
            break;
        case constants.VALIDATION_ERROR:
            res.status(constants.VALIDATION_ERROR).json({title : 'Validation Error',message : err.message,stackTrace : err.stack})
            break;
        case constants.FORBIDDEN:
            res.status(constants.FORBIDDEN).json({title : 'Forbidden data',message : err.message,stackTrace : err.stack})
            break;
        case constants.SERVER_ERROR:
            res.status(constants.SERVER_ERROR).json({title : 'Server Error',message : err.message,stackTrace : err.stack})
            break;
        default:
            console.log("No error found");
            break;
    }
}

module.exports = {errorHandler}