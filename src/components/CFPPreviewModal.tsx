import { Button, Modal, ModalVariant } from "@patternfly/react-core";
import { IConferenceFormState } from "./CFPFormHelper";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface IProps {
  isModalOpen: boolean;
  handleModalToggle: () => void;
  conferenceFormState: IConferenceFormState;
}

export function CFPPreviewModal(props: IProps) {
  const { isModalOpen, handleModalToggle, conferenceFormState } = props;
  const generatePDF = () => {
    const dd = {
      content: [
        {
          text: `${conferenceFormState.title}\n`,
          style: "header",
          alignment: "center",
        },
        {
          text: `${conferenceFormState.problem}\n`,
          style: "header",
          alignment: "center",
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
      },
    };
    pdfMake.createPdf(dd).open();
  };
  return (
    <Modal
      variant={ModalVariant.medium}
      title="Abstract Preview"
      isOpen={isModalOpen}
      onClose={handleModalToggle}
      actions={[
        <Button key="confirm" variant="primary" onClick={generatePDF}>
          Download PDF
        </Button>,
        <Button key="cancel" variant="link" onClick={props.handleModalToggle}>
          Cancel
        </Button>,
      ]}
    >
      {conferenceFormState.title}
    </Modal>
  );
}
