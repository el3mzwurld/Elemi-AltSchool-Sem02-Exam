import { Routes, Route } from "react-router-dom";
import MarkdownApp from "../Pages/home";
import NotFound from "../Pages/notfound";
import ErrorTest from "../Pages/errortest";
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
