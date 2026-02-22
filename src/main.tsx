import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./core/assets/App.css"
import { GoogleOAuthProvider } from '@react-oauth/google'
import FullLayout from './core/layouts/FullLayout.tsx'
import MainView from './features/Attraction/views/MainView.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
      <FullLayout children={<MainView isLogin={false} user={{email: 'test@example.com', name: 'Test User', attraction: '', location: '', city: ''}}/>}/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
