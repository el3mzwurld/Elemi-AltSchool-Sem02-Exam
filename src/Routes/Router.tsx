import { Routes, Route } from "react-router-dom";
import MarkdownApp from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import ErrorTest from "../components/errortest";
import ErrorBoundary from "../components/ErrorBoundary";
import { JSX } from "react";

function AppRoutes(): JSX.Element {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<MarkdownApp />} />
        <Route path="/home" element={<MarkdownApp />} />
        <Route path="/error" element={<ErrorTest />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default AppRoutes;
