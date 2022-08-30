import {
  ActionGroup,
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Radio,
  TextArea,
  TextInput,
} from "@patternfly/react-core";
import { keys, map } from "lodash";
import { useEffect, useState } from "react";
import { ConferenceAttendeeMembers } from "../enum/conferenceAttendeeMembers";
import { ConferenceCommitteeMembers } from "../enum/conferenceCommitteeMembers";
import { ConferenceTypes } from "../enum/conferenceTypes";
import {
  getCfpFormCache,
  IConferenceFormState,
  initialConfFormState,
  setCfpFormCache,
} from "./CFPFormHelper";
import { CFPPreviewModal } from "./CFPPreviewModal";

export function CFPForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [conferenceFormState, setConferenceFormState] =
    useState<IConferenceFormState>(initialConfFormState);
  const isFreeTypeSelected =
    ConferenceTypes.FREE === conferenceFormState.conferenceType;

  const handleModalToggle = () => setIsModalOpen(!isModalOpen);
  const getCacheValue = async () => {
    const cacheValue: IConferenceFormState = await getCfpFormCache();
    setConferenceFormState({
      ...conferenceFormState,
      ...cacheValue,
    });
  };
  useEffect(() => {
    getCacheValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUpdateValue = (key: string, value: any) => {
    const updatedObject = {
      ...conferenceFormState,
      [key]: value,
    };
    setConferenceFormState(updatedObject);
    setCfpFormCache(updatedObject);
  };

  const handleProblemChange = (text: string) => {
    onUpdateValue("problem", text);
  };

  const handleProblemReasonChange = (text: string) => {
    onUpdateValue("problemReason", text);
  };

  const handleTitleChange = (text: string) => {
    onUpdateValue("title", text);
  };

  const handleTakewaysChange = (text: string) => {
    onUpdateValue("takeways", text);
  };

  const onChangeConferenceType = (_, event) => {
    const { value } = event?.currentTarget;
    onUpdateValue("conferenceType", value);
  };

  const onChangeConferenceCommitteeMember = (_, event) => {
    const { value } = event?.currentTarget;
    onUpdateValue("conferenceCommitteeMember", value);
  };

  const onChangeConferenceAttendeeMember = (_, event) => {
    const { value } = event?.currentTarget;
    onUpdateValue("conferenceAttendeeMember", value);
  };

  const handleTitleProblemSolutionChange = (text: string) => {
    onUpdateValue("titleProblemSolution", text);
  };

  const onCancelForm = () => {
    setConferenceFormState(initialConfFormState);
    setCfpFormCache(initialConfFormState);
  };

  const renderConferenceTypeComponent = () => {
    return (
      <FormGroup
        role="radiogroup"
        isInline
        fieldId="conferenceType-group"
        label="What kind of conference is this?"
        isRequired
      >
        {map(keys(ConferenceTypes), (key) => {
          const value = ConferenceTypes[key];
          return (
            <Radio
              key={key}
              name={`organizerCommitteeMember${value}-radio`}
              label={value}
              id={`organizerCommitteeMember-radio${value}-01`}
              value={value}
              onChange={onChangeConferenceType}
              isChecked={value === conferenceFormState.conferenceType}
            />
          );
        })}
      </FormGroup>
    );
  };

  const renderFreeConferenceTypeComponent = () => {
    return (
      <FormGroup
        role="radiogroup"
        isInline
        fieldId="organizerCommitteeMember-group"
        label="Describe the average organizer/jury committee member for this conf?"
        isRequired
      >
        {map(keys(ConferenceCommitteeMembers), (key) => {
          const value = ConferenceCommitteeMembers[key];
          return (
            <Radio
              key={key}
              name={`organizerCommitteeMember${value}-radio`}
              label={value}
              id={`organizerCommitteeMember-radio${value}-01`}
              value={value}
              onChange={onChangeConferenceCommitteeMember}
              isChecked={
                value === conferenceFormState.conferenceCommitteeMember
              }
            />
          );
        })}
      </FormGroup>
    );
  };

  const renderPaidConferenceTypeComponent = () => {
    return (
      <FormGroup
        role="radiogroup"
        isInline
        fieldId="organizerAttendeeMember-group"
        label="Point out the value that this conference generates for the average attendee?"
        isRequired
      >
        {map(keys(ConferenceAttendeeMembers), (key) => {
          const value = ConferenceAttendeeMembers[key];
          return (
            <Radio
              key={key}
              name={`organizerAttendeeMember${value}-radio`}
              label={value}
              id={`organizerAttendeeMember-radio${value}-01`}
              value={value}
              onChange={onChangeConferenceAttendeeMember}
              isChecked={value === conferenceFormState.conferenceAttendeeMember}
            />
          );
        })}
      </FormGroup>
    );
  };

  const getHelpTextForProblemTextarea = () => {
    const text = `Just the problem" and why is it a problem for the average`;
    if (isFreeTypeSelected) {
      return `${text} Organizer/Jury member who is ${conferenceFormState.conferenceCommitteeMember}`;
    } else {
      return `${text} attendee who is here for ${conferenceFormState.conferenceAttendeeMember}`;
    }
  };

  return (
    <>
      <Card isPlain>
        <CardTitle>Abstract generator</CardTitle>
        <CardBody>
          <Form isWidthLimited>
            {renderConferenceTypeComponent()}
            {isFreeTypeSelected && renderFreeConferenceTypeComponent()}
            {!isFreeTypeSelected && renderPaidConferenceTypeComponent()}
            <FormGroup
              label="Describe the problem that your submission tries to address"
              fieldId="confProblemTextarea"
              isRequired
              helperText={getHelpTextForProblemTextarea()}
            >
              <TextArea
                value={conferenceFormState.problem}
                onChange={handleProblemChange}
                id="confProblemTextarea"
                name="confProblemTextarea"
              />
            </FormGroup>

            <FormGroup
              label="Reasons for the problem"
              fieldId="confProblemReasonTextarea"
              helperText={`Describe the reasons (preferably in a list) that cause the problem that your paper tries to address`}
              isRequired
            >
              <TextArea
                value={conferenceFormState.problemReason}
                onChange={handleProblemReasonChange}
                id="confProblemReasonTextarea"
                name="confProblemReasonTextarea"
              />
            </FormGroup>

            <FormGroup
              label="Title of the paper"
              helperText="Name your paper in a way that addresses all the reasons that you listed in last question"
              fieldId="confTitle"
              isRequired
            >
              <TextInput
                value={conferenceFormState.title}
                isRequired
                onChange={handleTitleChange}
                id="confTitle"
                name="confTitle"
                type="text"
                aria-describedby="Conference Title"
              />
            </FormGroup>

            <FormGroup
              label="Describe how your title is actually solving the problems you listed in question 3."
              helperText="You can use - real world experience reports, case studies, research papers or your analysis as arguements."
              fieldId="confTitleExplanation"
              isRequired
            >
              <TextArea
                value={conferenceFormState.titleProblemSolution}
                onChange={handleTitleProblemSolutionChange}
                id="confTitleExplanation"
                name="confTitleExplanation"
              />
            </FormGroup>

            <FormGroup
              label="Takeways"
              helperText="Repeat the top 3 key lessons from your paper."
              fieldId="conf3Takeways"
              isRequired
            >
              <TextArea
                value={conferenceFormState.takeways}
                onChange={handleTakewaysChange}
                id="conf3Takeways"
                name="conf3Takeways"
              />
            </FormGroup>

            <ActionGroup>
              <Button onClick={handleModalToggle} variant="primary">
                Preview
              </Button>
              <Button onClick={onCancelForm} variant="link">
                Cancel
              </Button>
            </ActionGroup>
          </Form>
        </CardBody>
      </Card>
      <CFPPreviewModal
        isModalOpen={isModalOpen}
        handleModalToggle={handleModalToggle}
        conferenceFormState={conferenceFormState}
      />
    </>
  );
}
