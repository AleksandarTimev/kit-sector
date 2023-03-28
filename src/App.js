import "./public/css/App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home.js";
import { LoginForm } from "./components/Login.js";
import { RegisterForm } from "./components/Register.js";
import { Contacts } from "./components/Contacts";
import { Footer } from "./components/Footer.js";
import { Navbar } from "./components/Navigation.js"
import { UploadForm } from "./components/Upload.js"
import { Catalog } from "./components/Catalog.js";
import { EditForm } from "./components/Edit.js";
import { Details } from "./components/Details.js";
import { NotFound } from "./components/NotFound.js";
import { Cart } from "./components/Cart.js";
import { Profile } from "./components/Profile";

function App() {

  return (
    <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/edit/:id" element={<EditForm />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
