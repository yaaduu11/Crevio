import { Route, Routes, Navigate } from "react-router-dom";
import { adminRoutes } from "../constants/routeUrl";
import AdminsignIn from "../pages/admin/signIn";
import Dashboard from "../pages/admin/dashboard";
import Subscriptions from "../pages/admin/subscriptions";
import Freelancers from "../pages/admin/freelancers";
import Clients from "../pages/admin/clients";
import { useSelector } from "react-redux";
import { RootState } from "../redux/storage";
import { ReactNode } from "react";

export const AdminRoutes = ()=>{
    const admin = useSelector((state: RootState) => state.admin);

    const PrivateRoute = ({ children }: { children: ReactNode }) => {
        return admin?.accessToken? <>{children}</> : <Navigate to={`/admin${adminRoutes.SIGNIN}`}/>;
    };

    const PublicRoute = ({ children }: { children: ReactNode }) => {
        return admin?.accessToken? <Navigate to={`/admin${adminRoutes.DASHBOARD}`}/> : <>{children}</>;
    };

    return (
        <>
            <Routes>
                <Route 
                    path={adminRoutes.SIGNIN} 
                    element={<PublicRoute> <AdminsignIn/> </PublicRoute>}
                />
                <Route
                    path={adminRoutes.DASHBOARD}
                    element={<PrivateRoute> <Dashboard/> </PrivateRoute>}
                />
                <Route
                    path={adminRoutes.SUBSCRIPTIONS}
                    element={<PrivateRoute> <Subscriptions/> </PrivateRoute> }
                />
                <Route
                    path={adminRoutes.FREELANCERS}
                    element={<PrivateRoute> <Freelancers/> </PrivateRoute>}
                />
                <Route
                    path={adminRoutes.CLIENTS}
                    element={<PrivateRoute> <Clients/> </PrivateRoute>}
                />
            </Routes>
        </>
    )
}