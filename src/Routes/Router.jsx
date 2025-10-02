import { Routes, Route } from "react-router-dom";
import MarkdownApp from "../Pages/home";
import NotFound from "../Pages/notfound";
import ErrorTest from "../components/errortest";
import ErrorBoundary from "../components/errorboundary";
function AppRoutes() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<MarkdownApp />}></Route>
        <Route path="/home" element={<MarkdownApp />}></Route>
        <Route path="/error" element={<ErrorTest />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default AppRoutes;
