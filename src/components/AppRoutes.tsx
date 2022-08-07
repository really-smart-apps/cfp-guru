import { Routes, Route } from "react-router-dom";
import { CFPForm } from "./CFPForm";
import { CFPHome } from "./CFPHome";
import { AboutUs} from "./AboutUs";

export const mainContentId = "main-content-page-layout";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CFPHome />} />
      <Route path="cfpform" element={<CFPForm />} />
      <Route path="aboutus" element={<AboutUs />}/>
    </Routes>
  );
}
