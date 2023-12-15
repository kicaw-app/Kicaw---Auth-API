import Joi from "joi";

const registerUserValidation = Joi.object({
    name: Joi.string().max(100).required(),
    username: Joi.string().max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().max(100).required()
});

const loginUserValidation = Joi.object({
    email: Joi.string().max(254).required(),
    password: Joi.string().max(100).required()
});

const getUserValidation = Joi.string().max(100).required();

const updateUserValidation = Joi.object({
    name: Joi.string().max(100).optional(),
    username: Joi.string().max(100).required(),
    email: Joi.string().max(254).optional(),
    password: Joi.string().max(100).optional()
})

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
}