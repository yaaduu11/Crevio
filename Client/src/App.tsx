import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { UserRoutes } from './routes/UserRoutes';
import { AdminRoutes } from './routes/AdminRoutes';

const App: React.FC = () => {
  return (
    <>      
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRoutes/>} />
          <Route path="/admin/*" element={<AdminRoutes/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
