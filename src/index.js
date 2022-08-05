import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
//css
import "./public/styles/index.css"
//pages
import Index from "./pages/main";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
    </Routes>
  </BrowserRouter>
);