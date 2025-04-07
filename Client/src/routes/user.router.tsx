import { Route, Routes, Navigate } from "react-router-dom";
import { userRoutes } from "../constants/routeUrl";   
import { useSelector } from "react-redux";
import { RootState } from "../redux/storage";
import { ReactNode } from "react";

import Home from "../pages/user/Home";
import SignIn from "../pages/user/SignIn";
import SignUp from "../pages/user/SignUp";
import Otp from "../pages/user/Otp";
import Projects from "../pages/user/Projects";
import About from "../pages/user/About";
import ForgotPassword from "../pages/user/ForgotPassword";
import NewPassword from "../pages/user/NewPassword";
import Dashboard from "../pages/user/Dashboard";
import Profile from "../pages/user/Profile";
import Pricing from "../pages/user/Pricing";
import SuccessPage from "../components/user/successPage";
import MyProjects from "../pages/user/MyProjects";


export const UserRoutes = () => {
    const user = useSelector((state: RootState) => state.user);

    const RoleBasedRoute = ({ children, allowedRole }: { children: ReactNode; allowedRole: string }) => {
        return user.role? allowedRole == user?.role ? <>{children}</> : <Navigate to={userRoutes.HOME} />: '';
    };    

    const PrivateRoute = ({ children }: { children: ReactNode }) => {
        return user?.accessToken ? <>{children}</> : <Navigate to={userRoutes.HOME} />;
    };

    const PublicRoute = ({ children }: { children: ReactNode }) => {
        return user?.accessToken ? <Navigate to={userRoutes.HOME} /> : <>{children}</>;
    };

    return (
        <>
          <Routes>
                <Route 
                    path={userRoutes.HOME}
                    element={<Home/>}
                />
                <Route
                    path={userRoutes.SIGNIN}
                    element={<PublicRoute> <SignIn/> </PublicRoute>}
                />
                <Route
                    path={userRoutes.SIGNUP}
                    element={<PublicRoute> <SignUp/> </PublicRoute>}
                />
                <Route
                    path={userRoutes.OTP} 
                    element={<PublicRoute> <Otp/> </PublicRoute>}
                />
                <Route
                    path={userRoutes.FORGOT_PASSWORD} 
                    element={<PublicRoute> <ForgotPassword/> </PublicRoute>}
                />
                <Route
                    path={userRoutes.NEW_PASSWORD} 
                    element={<PublicRoute> <NewPassword/> </PublicRoute>}
                />
                <Route
                    path={userRoutes.PROJECTS}
                    element={<PrivateRoute> <Projects/> </PrivateRoute>}
                />
                <Route
                    path={userRoutes.ABOUT}
                    element={<PrivateRoute> <About/> </PrivateRoute>}
                />
                <Route
                    path={userRoutes.PRICING}
                    element={<PrivateRoute> <Pricing/> </PrivateRoute>}
                />
                <Route
                    path={userRoutes.DASHBOARD}
                    element={<PrivateRoute> <Dashboard/> </PrivateRoute>}
                />
                <Route
                    path={userRoutes.PROFILE}
                    element={<PrivateRoute> <Profile/> </PrivateRoute>}
                />
                <Route
                    path={userRoutes.MY_PROJECTS}
                    element={<PrivateRoute> <RoleBasedRoute allowedRole={"client"}> <MyProjects /> </RoleBasedRoute> </PrivateRoute>}
                />
                <Route
                    path={userRoutes.SUCCESS}
                    element={<PrivateRoute> <SuccessPage/> </PrivateRoute>}
                />
          </Routes>
        </>
    )
}