import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const el = document.getElementById("app");

ReactDOM.createRoot(el).render(<BrowserRouter><App /></BrowserRouter>);