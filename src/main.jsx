import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WishlistProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WishlistProvider>
  </StrictMode>
);