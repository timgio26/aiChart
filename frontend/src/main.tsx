import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes,Route } from "react-router";
import './index.css'
// import App from './CookingAI.tsx'
import { Home } from './Home.tsx';
import CookingAI from './CookingAI.tsx';
import { ChartAI } from './ChartAI.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route element={<Home/>}>
        <Route index  element={<CookingAI/>}/>
        <Route path='/chart' element={<ChartAI/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
