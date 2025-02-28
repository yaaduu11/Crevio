import { Route, Routes } from "react-router-dom";
import { userRoutes } from "../constants/routeUrl";   
              
import Home from "../pages/user/Home";
import SignIn from "../pages/user/SignIn";
import SignUp from "../pages/user/SignUp";
import Otp from "../pages/user/Otp";
import Projects from "../pages/user/Projects";
import About from "../pages/user/About";
import ForgotPassword from "../pages/user/ForgotPassword";
import NewPassword from "../pages/user/NewPassword";


export const UserRoutes = () => {
    return (
        <>
          <Routes>
               <Route 
                    path={userRoutes.HOME}
                    element={<Home/>}
                />
                <Route
                    path={userRoutes.SIGNIN}
                    element={<SignIn/>}
                />
                <Route
                    path={userRoutes.SIGNUP}
                    element={<SignUp/>}
                />
                <Route
                    path={userRoutes.OTP} 
                    element={<Otp/>}
                />
                <Route
                    path={userRoutes.FORGOT_PASSWORD} 
                    element={<ForgotPassword/>}
                />
                <Route
                    path={userRoutes.NEW_PASSWORD} 
                    element={<NewPassword/>}
                />
                <Route
                    path={userRoutes.PROJECTS}
                    element={<Projects/>}
                />
                <Route
                    path={userRoutes.ABOUT}
                    element={<About/>}
                />
          </Routes>
        </>
    )
}