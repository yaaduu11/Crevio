import { Route, Routes } from "react-router-dom";
import { adminRoutes } from "../constants/routeUrl";
import AdminsignIn from "../pages/admin/signIn";

export const AdminRoutes = ()=>{
    return (
        <>
            <Routes>
                <Route 
                    path={adminRoutes.SIGNIN} 
                        element={<AdminsignIn/>}
                />
            </Routes>
        </>
    )
}