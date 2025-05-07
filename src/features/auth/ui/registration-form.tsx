import { useAuthStore } from "../../../stores/auth"
import { FormProvider, useForm } from 'react-hook-form';
import { FormRegisterSchema, type TFormRegisterValue } from "../lib/schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { toast } from "react-toastify";

export const RegistrationForm = () => {
    const { registration } = useAuthStore();
    const form = useForm<TFormRegisterValue>({
        resolver: zodResolver(FormRegisterSchema),
        defaultValues: {
            email: '',
            name: '',
            pass: '',
            confirmPass: ''
        }
    })

    const onSubmit = async (data: TFormRegisterValue) => {
        try {
            await registration(data.email, data.name, data.pass);

            toast.success("Регистрация успешна!");
        } catch(err) {
            console.error(err);
            toast.error("Ошибка регистрации!");
        }
    }

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}>
                    <TextInput
                        {...form.register('email')}
                        label="Почта"
                        type="email"
                        error={form.formState.errors.email?.message}
                        placeholder="example@mail.com"
                    />

                    <TextInput
                        {...form.register('name')}
                        label="Имя"
                        type="text"
                        error={form.formState.errors.name?.message}
                        placeholder="Иван"
                    />

                    <PasswordInput
                        {...form.register('pass')}
                        type="password"
                        label="Пароль"
                        error={form.formState.errors.pass?.message}
                        placeholder="●●●●●●●●"
                        />

                    <PasswordInput
                        {...form.register('confirmPass')}
                        type="password"
                        label="Пароль"
                        error={form.formState.errors.confirmPass?.message}
                        placeholder="●●●●●●●●"
                    />

                    <Button
                        className="mt-4" 
                        loading={form.formState.isSubmitting}  
                        type="submit">Регистрация</Button>
            </form>
        </FormProvider>
    )
}