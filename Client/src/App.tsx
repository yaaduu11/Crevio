import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { UserRoutes } from './routes/user.router';
import { AdminRoutes } from './routes/admin.router';
import { Toaster } from './components/ui/toaster'


const App: React.FC = () => {
  return (
    <>      
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;