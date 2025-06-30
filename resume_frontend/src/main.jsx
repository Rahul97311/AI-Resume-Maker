import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Root from "./pages/Root";
import GenerateResume from "./pages/GenerateResume";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="" element={<Home />} />
          <Route path="generate-resume" element={<GenerateResume />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);