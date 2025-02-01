import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/user/landingPage";
import SignIn from "../pages/user/SignIn";
import SignUp from "../pages/user/SignUp";
import Otp from "../pages/user/otp";
import { userRoutes } from "../constants/routeUrl";


export const UserRoutes = () => {
    return (
        <>
          <Routes>
               <Route 
                    path={userRoutes.LANDING} 
                    element={<LandingPage/>}
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