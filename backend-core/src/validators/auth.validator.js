const joi =  require("joi")
const ApiError = require("../utils/ApiError")


const validate = (schema) => (req,res,next) => {
    const {error} = schema.validate(req.body,{abortEarly:false});

    if(error){
        const errors = error.details.map((d) => d.message);
        throw new ApiError(422,"Validation failed",errors);
    }
    next();
};

const registerSchema = joi.object({
    name : joi.string().min(3).max(100).required(),
    email : joi.string().email().required(),
    password : joi.strinng().min(8).required()
});

const loginSchema = joi.object({
    email : joi.string().email().required(),
    password : joi.string().required()
});

module.exports = {
    validateRegister : validate(registerSchema),
    validateLogin : validate(loginSchema)
};