import { z } from "zod";

export const passwordSchema = z.string().min(6, { message: "Пароль должен содержать не менее 6 символов!"})

export const FormLoginSchema = z.object({
    email: z.string().email({ message: "Введите корректную почту!" }),
    pass: passwordSchema
});

export const FormRegisterSchema = FormLoginSchema.merge(
    z.object({
        name: z.string().min(4, { message: "Введите имя!"}),
        confirmPass: passwordSchema
    })
).refine(data => data.pass === data.confirmPass, {
    message: 'Пароли не совпадают!',
    path: ['confirmPass']
});

export type TFormLoginValue = z.infer<typeof FormLoginSchema>
export type TFormRegisterValue = z.infer<typeof FormRegisterSchema>