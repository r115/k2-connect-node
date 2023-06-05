import { K2Options } from "../k2.core";
import Joi from "joi";

export function validateInitializationData(options: K2Options) {
    const schema = Joi.object({
        clientId: Joi.string().min(3),
        clientSecret: Joi.string().min(1),
        apiKey: Joi.string().min(1)
    });

    const { error } = schema.validate(options);
    
    if (error) {
        throw new Error(error.message);
    }

    return true;
};