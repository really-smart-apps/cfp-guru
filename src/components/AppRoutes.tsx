import { Routes, Route } from "react-router-dom";
import { CFPForm } from "./CFPForm";
import { CFPHome } from "./CFPHome";

export const mainContentId = "main-content-page-layout";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CFPHome />} />
      <Route path="cfpform" element={<CFPForm />} />
    </Routes>
  );
}
