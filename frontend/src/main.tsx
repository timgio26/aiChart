import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
// import App from './CookingAI.tsx'
import { Home } from "./Home.tsx";
// import CookingAI from "./CookingAI.tsx";
import { ChartAI } from "./ChartAI.tsx";
import {Toaster} from 'react-hot-toast'

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />}>
            {/* <Route index element={<CookingAI />} /> */}
            <Route index element={<ChartAI />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster/>
    </QueryClientProvider>
  </StrictMode>
);
