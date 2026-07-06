import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initCookieConsent } from "./lib/cookie-consent";

initCookieConsent();

createRoot(document.getElementById("root")!).render(<App />);
