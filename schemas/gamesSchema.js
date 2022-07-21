import joi from 'joi';

const gamesSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().uri().required(),
    stockTotal: joi.number().positive().required(),
    categoryId: joi.number().required(),
    pricePerDay: joi.number().positive().required()
});

export default gamesSchema;