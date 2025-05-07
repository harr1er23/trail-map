import { z } from "zod";

export const FormJourneySchema = z.object({
    country: z.string().min(3, { message: "Введите страну" }),
    city: z.string().min(4, { message: "Введите город" }),
    description: z.string().min(10, {message: "Опишите "}),
    startDate: z.string(),
    endDate: z.string(),
    photo: z.string().optional() 
})