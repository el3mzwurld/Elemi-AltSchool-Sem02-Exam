import { Routes, Route } from "react-router-dom";
import MarkdownApp from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import ErrorTest from "../Pages/ErrorTest";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MarkdownApp />}></Route>
      <Route path="/error" element={<ErrorTest />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default AppRoutes;
