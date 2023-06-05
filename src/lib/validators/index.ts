import { z } from "zod";
import { K2Options } from "../k2.core";

export function validateInitializationData(options: K2Options) {
    const ApiOptionsData = z.object({
        clientId: z.string(),
        clientSecret: z.string(),
        apiKey: z.string(),
        baseUrl: z.string()
    });

    const isValidData = ApiOptionsData.parse(options);

    console.log(isValidData);

    return isValidData;
};