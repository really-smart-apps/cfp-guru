import {
  Banner,
  Bullseye,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Text,
  TextContent,
  TextVariants,
} from "@patternfly/react-core";
import { useNavigate } from "react-router-dom";
import { AppTabs } from "../enum/appTabs";

export function CFPHome() {
  const navigate = useNavigate();
  const navigateCreateEscalationPage = () => {
    navigate(`${AppTabs.CFP_FORM.path}`, { replace: true });
  };
  const cardValue = (
    <Card isPlain isLarge>
      <CardTitle>
        <TextContent>
          <Text
            className="font-size-7vw pf-u-text-align-center"
            component={TextVariants.h1}
          >
            CFP GURU
          </Text>
        </TextContent>
        <Banner variant="info" screenReaderText="Banner line" />
      </CardTitle>
      <CardBody>
        <div className="pf-u-text-align-center">
          Create killer conference submissions in minutes
        </div>
      </CardBody>
      <CardFooter className="pf-u-text-align-center">
        <Button onClick={navigateCreateEscalationPage} variant="primary">
          Start
        </Button>
      </CardFooter>
    </Card>
  );
  return <Bullseye>{cardValue}</Bullseye>;
}
