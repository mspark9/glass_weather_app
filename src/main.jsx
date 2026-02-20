import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?lat=37.56&lon=127.00&appid={API key}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
