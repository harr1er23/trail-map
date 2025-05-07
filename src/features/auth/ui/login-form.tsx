import { useAuthStore } from "../../../stores/auth"
import { FormProvider, useForm } from 'react-hook-form';
import { FormLoginSchema, type TFormLoginValue } from "../lib/schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { toast } from 'react-toastify';

export const LoginForm = () => {
    const { login } = useAuthStore();
    const form = useForm<TFormLoginValue>({
        resolver: zodResolver(FormLoginSchema),
        defaultValues: {
            email: '',
            pass: ''
        }
    })

    const onSubmit = async (data: TFormLoginValue) => {
        try {
            await login(data.email, data.pass);

            toast.success("Авторизация успешна!");
        } catch(err) {
            console.error(err);
            toast.error("Ошибка авторизации! Проверьте данные для входа.");
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

                    <PasswordInput
                        {...form.register('pass')}
                        type="password"
                        label="Пароль"
                        error={form.formState.errors.pass?.message}
                        placeholder="●●●●●●●●"
                    />

                    <Button
                        className="mt-4" 
                        loading={form.formState.isSubmitting}  
                        type="submit">
                            Войти
                    </Button>
            </form>
        </FormProvider>
    )
}