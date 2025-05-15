import { z } from "zod";

export const FormJourneySchema = z.object({
    country: z.string().min(3, { message: "Введите страну или выберите точку на карте!" }),
    city: z.string().min(4, { message: "Введите город или выберите точку на карте!" }),
    description: z.string().optional(),
    image: z.string().optional(),
    coords: z.tuple([z.number(), z.number()], { message: 'Выберите точку на карте!'})
})

export type TFormJourneySchema = z.infer<typeof FormJourneySchema>