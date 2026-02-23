import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./core/assets/App.css"
import { GoogleOAuthProvider } from '@react-oauth/google'
import FullLayout from './core/layouts/FullLayout.tsx'
import App from './App.tsx'
import { AuthProvider } from './core/shared/context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
      <AuthProvider>
        <FullLayout>
          <App/>
        </FullLayout>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
)
