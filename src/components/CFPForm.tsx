import {
  ActionGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  FormGroup,
} from "@patternfly/react-core";
export function CFPForm() {
  return (
    <Card isFullHeight isPlain>
      <CardTitle>Header</CardTitle>
      <CardBody>
        <Form>
          <FormGroup label="Cluster" fieldId="cluster-01"></FormGroup>
          <FormGroup label="Project" fieldId="project-01"></FormGroup>
          <FormGroup label="Console" fieldId="console-01"></FormGroup>

          <ActionGroup>
            <Button variant="primary">Submit</Button>
          </ActionGroup>
        </Form>
      </CardBody>
      <CardFooter>footer</CardFooter>
    </Card>
  );
}
