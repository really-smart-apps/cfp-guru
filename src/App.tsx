import { Bullseye } from "@patternfly/react-core";
import "@patternfly/react-core/dist/styles/base.css";
import { AppLayout } from "./components/AppLayout";
import "./styles/App.scss";

function App() {
  return (
    <AppLayout>
      <Bullseye>
        <div>Bullseye ◎ layout</div>
      </Bullseye>
    </AppLayout>
  );
}

export default App;
