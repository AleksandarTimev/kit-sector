import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { LoginForm } from "./components/Login.js";
import { RegisterForm } from "./components/Register.js";
import { Contacts } from "./components/Contacts";
import { Footer } from "./components/Footer.js";
import { Navbar } from "./components/Navigation.js"
import { UploadForm } from "./components/Upload.js"
import { Catalog } from "./components/Catalog";
import { EditForm } from "./components/Edit";

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
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
