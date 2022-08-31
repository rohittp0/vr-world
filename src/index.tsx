import "./bootstrap.css";

import { Workbox } from "workbox-window";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./pages/Form";
import HandleToken from "./pages/HandleToken";
import Home from "./pages/Home";
import Members from "./pages/members/index";
import { HandleAppState } from "./components/HandleAppState";
import Contact from "./pages/contactUs/ContactUs";
import About from "./pages/about/about";
import Blog from "./pages/Blog";
import {createRoot} from "react-dom/client";
import Login from "./pages/login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard";

const isProduction =
  location.hostname !== "localhost" &&
  location.protocol !== "http:" &&
  "serviceWorker" in navigator;

const wb = new Workbox("/sw.js");

if (isProduction) wb.register().catch(console.error);

function App()
{
  return (
    <>
      {isProduction && <HandleAppState wb={wb} />}
      <BrowserRouter>
        <Routes>
          <Route path="/set_token" element={<HandleToken />} />
          <Route path="/" element={<Home />} />
          <Route path="/members" element={<Members />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/form" element={<Form />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

const render = createRoot(document.getElementById("root") as HTMLDivElement);
render.render(<App />);
