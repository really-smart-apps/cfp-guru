import {
  
  Bullseye,
  Card,
  CardBody,
  CardFooter,
  TextContent
} from "@patternfly/react-core";
import { useNavigate } from "react-router-dom";
import { AppTabs } from "../enum/appTabs";

export function AboutUs() {
  const navigate = useNavigate();
  const navigateCreateEscalationPage = () => {
    navigate(`${AppTabs.ABOUT_US.path}`, { replace: true });
  };
  const cardValue = (
    <Card isPlain isLarge>
      <CardBody><TextContent>
        <div className="pf-u-text-align-center">
        We have collected all the wisdom from the internet on how to create wonderful conference submissions 
        and put them into an intuitive form.
        It helps you structure your submission into a winning format.</div>
        </TextContent></CardBody>
      <CardFooter className="pf-u-text-align-center">
     
     
     
     Made with ❤ for aspiring speakers | Copyright © 2022 cfp-guru
      </CardFooter>
    </Card>
  );
  return <Bullseye>{cardValue}</Bullseye>;
}
