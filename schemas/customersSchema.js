import joi from 'joi';

const now = Date.now();
const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18)); 
const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().pattern(new RegExp('^[0-9]{10,11}$')).required(),
    cpf: joi.string().pattern(new RegExp('^[0-9]{11}$')).required(),
    birthday: joi.date().max(cutoffDate).required()
});

export default customersSchema;