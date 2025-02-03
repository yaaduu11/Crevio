import { Route, Routes } from "react-router-dom";
import Home from "../pages/user/Home";
import SignIn from "../pages/user/SignIn";
import SignUp from "../pages/user/SignUp";
import Otp from "../pages/user/Otp";
import { userRoutes } from "../constants/routeUrl";


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
          </Routes>

          {/* Navbar */} 
          {/* <Routes>
                <Route 
                    path={userRoutes.HOME}
                />
          </Routes> */}
        </>
    )
}