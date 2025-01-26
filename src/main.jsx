import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import HomePage from './components/Home.jsx'
import AchievementsPage from './components/AchievementsPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* You can choose to use either <App /> or <HomePage /> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
