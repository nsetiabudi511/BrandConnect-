import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import OpportunitiesPage from "./app/OpportunitiesPage.tsx";
import "./styles/index.css";

const path = window.location.pathname;
const RootComponent = path === "/opportunities" ? <OpportunitiesPage /> : <App />;

createRoot(document.getElementById("root")!).render(RootComponent);
