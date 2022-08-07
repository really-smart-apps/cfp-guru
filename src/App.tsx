import "@patternfly/react-core/dist/styles/base.css";
import { AppLayout } from "./components/AppLayout";
import { AppRoutes } from "./components/AppRoutes";
import "./styles/App.scss";

function App() {
  return (
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  );
}

export default App;
