import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/storage";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StrictMode>
        <GoogleOAuthProvider clientId='267776999193-sj19e0deq609g0480niqp0bohvcf5qfv.apps.googleusercontent.com'>
          <App />
        </GoogleOAuthProvider>
      </StrictMode>
    </PersistGate>
  </Provider>
)