import { Loader } from "@mantine/core";
import React, { lazy, Suspense, type JSX } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "../stores/auth";
import ProfilePage from "../pages/profile/ProfilePage";

const AuthPage = lazy(() => import('../pages/auth/AuthPage'))
const JourneysPage = lazy(() => import('../pages/journeys/JourneysPage'))
const MapPage = lazy(() => import('../pages/map/MapPage'));
const NotFound = lazy(() => import('../pages/notfound/NotFoundPage'));

const PrivateRoute = ({children}: {children: JSX.Element}) => {
    const checkAuth = useAuthStore((state) => state.checkAuth);
    const [isTokenValid, setIsTokenValid] = React.useState<boolean | null>(null);

    React.useEffect(() => {
        const verifyToken = async () => {
            try {
                const isValid = await checkAuth();
                setIsTokenValid(isValid);
            } catch (err) {
                setIsTokenValid(false);
                console.error(err);
            }
          };
      
          verifyToken();
    }, [checkAuth])
    
    if (isTokenValid === null) {
        return <Loader size="xl" variant="dots" className="mx-auto mt-20" />;
    }
    
    return isTokenValid ? children : <Navigate to="/auth" replace />;
}

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loader size="xl" variant="dots" className="mx-auto mt-20" />}>
            <Routes>
                <Route path="/auth" element={<AuthPage />}></Route>
                
                <Route path="/map" element={<PrivateRoute><MapPage /></PrivateRoute>}></Route>
                <Route path="/journeys" element={<PrivateRoute><JourneysPage /></PrivateRoute>}></Route>
                <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>}></Route>
                
                <Route path="/notFound" element={<NotFound />}></Route>
                <Route path="*" element={<Navigate to="/notFound" replace/>}></Route>
            </Routes>
            </Suspense>
        </BrowserRouter>
    )
}