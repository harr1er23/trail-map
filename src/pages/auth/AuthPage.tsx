import { LoginForm } from '../../features/auth/ui/login-form'
import { Center, Tabs } from '@mantine/core'
import { RegistrationForm } from '../../features/auth/ui/registration-form'

const AuthPage = () => {
  return (
    <Center className="h-screen bg-gray-50">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Добро пожаловать</h1>
        <Tabs defaultValue="login" className="max-w-md mx-auto">
          <Tabs.List grow>
            <Tabs.Tab value="login">Вход</Tabs.Tab>
            <Tabs.Tab value="register">Регистрация</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="login" pt="md">
            <LoginForm />
          </Tabs.Panel>

          <Tabs.Panel value="register" pt="md">
            <RegistrationForm />
          </Tabs.Panel>
        </Tabs>
      </div>
  </Center>
  )
}

export default AuthPage