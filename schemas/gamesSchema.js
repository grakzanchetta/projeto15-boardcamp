import joi from 'joi';

const gamesSchema = joi.object({
    name: joi.string().required(),
    image: joi.string(),
    stockTotal: joi.number().positive().required(),
    categoryId: joi.number(),
    pricePerDay: joi.number().positive().required()
});

export default gamesSchema;