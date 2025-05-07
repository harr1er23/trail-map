import { Loader } from "@mantine/core";
import { lazy, Suspense, type JSX } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "../stores/auth";

const AuthPage = lazy(() => import('../pages/auth/AuthPage'))
const JourneysPage = lazy(() => import('../pages/journeys/JourneysPage'))
const MapPage = lazy(() => import('../pages/map/MapPage'));
const NotFound = lazy(() => import('../pages/notfound/NotFoundPage'));

const PrivateRoute = ({children}: {children: JSX.Element}) => {
    const { token } = useAuthStore();
    return token ? children : <Navigate to="/auth" replace />
}

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loader size="xl" variant="dots" className="mx-auto mt-20" />}/>
            <Routes>
                <Route path="/auth" element={<AuthPage />}></Route>
                
                <Route path="/map" element={<PrivateRoute><MapPage /></PrivateRoute>}></Route>
                <Route path="/journeys" element={<PrivateRoute><JourneysPage /></PrivateRoute>}></Route>
                
                <Route path="/notFound" element={<NotFound />}></Route>
                <Route path="*" element={<Navigate to="/notFound" replace/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}