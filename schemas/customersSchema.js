import joi from 'joi';

const customersSchema = joi.object({
    name: joi.string().required()
});

export default customersSchema;