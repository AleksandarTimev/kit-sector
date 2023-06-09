import React from 'react';
import ReactDOM from 'react-dom/client';
import './public/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./public/css/App.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

reportWebVitals();
