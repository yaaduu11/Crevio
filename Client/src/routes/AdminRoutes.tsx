import { Route, Routes } from "react-router-dom";
import { adminRoutes } from "../constants/routeUrl";
import AdminsignIn from "../pages/admin/signIn";
import Dashboard from "../pages/admin/dashboard";
import Subscriptions from "../pages/admin/subscriptions";
import Freelancers from "../pages/admin/freelancers";
import Clients from "../pages/admin/clients";

export const AdminRoutes = ()=>{
    return (
        <>
            <Routes>
                <Route 
                    path={adminRoutes.SIGNIN} 
                    element={<AdminsignIn/>}
                />
                <Route
                    path={adminRoutes.DASHBOARD}
                    element={<Dashboard/>}
                />
                <Route
                    path={adminRoutes.SUBSCRIPTIONS}
                    element={<Subscriptions/>}
                />
                <Route
                    path={adminRoutes.FREELANCERS}
                    element={<Freelancers/>}
                />
                <Route
                    path={adminRoutes.CLIENTS}
                    element={<Clients/>}
                />
            </Routes>
        </>
    )
}