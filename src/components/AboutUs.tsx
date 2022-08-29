import {
  Bullseye,
  Button,
  Card,
  CardBody,
  CardFooter,
  TextContent,
} from "@patternfly/react-core";

export function AboutUs() {
  const aboutUsContent = (
    <Card isPlain isLarge>
      <CardBody>
        <TextContent>
          <div className="pf-u-text-align-center">
            We have collected all the wisdom from the internet on how to create
            wonderful conference submissions and put that into an intuitive
            form. CFP Guru helps you structure your idea into a winning format.
          </div>
        </TextContent>
      </CardBody>
      <CardBody><div className="pf-u-text-align-center"><TextContent>Need more help? Set up a free mentorship session with an expert</TextContent><br /><br /><Button component="a" href="https://adplist.org/mentors/deepak-koul-hehimhis" target="_blank" key="Need More Help?" variant="primary">
Find Slots</Button></div></CardBody><br /><br /><br /><br />
      <CardFooter className="pf-u-text-align-center">
        Made with ❤ for aspiring speakers | Copyright © 2022 cfp-guru
      </CardFooter>
    </Card>
  );
  return <Bullseye>{aboutUsContent}</Bullseye>;
}
