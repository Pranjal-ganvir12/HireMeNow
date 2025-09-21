import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import Home from "./pages/Home";
import RecruiterPage from "./pages/Recruiter";
import CandidatePage from "./pages/candidate";
import PreviewPage from "./pages/Preview";
import CallPage from "./pages/call";
import SummaryPage from "./pages/summary";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/recruiter", element: <RecruiterPage /> },
  { path: "/candidate", element: <CandidatePage /> },
  { path: "/preview/:specId", element: <PreviewPage /> },
  { path: "/call/:specId/:candidateId", element: <CallPage /> },
  { path: "/summary/:interviewId", element: <SummaryPage /> }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
