import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/user/landingPage';
import SignIn from './pages/user/SignIn';
import SignUp from './pages/user/SignUp'
import Otp from './pages/user/otp'
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div>      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/otp" element={<Otp/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
