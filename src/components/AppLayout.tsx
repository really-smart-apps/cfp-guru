import {
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadMain,
  Page,
  PageSection,
  PageSectionVariants,
} from "@patternfly/react-core";

interface IAppLayout {
  children: React.ReactNode;
}
export const mainContentId = "main-content-page-layout";

export function AppLayout({ children }: IAppLayout) {
  const header = (
    <Masthead id="basic">
      <MastheadMain>
        <MastheadBrand>CFP Guru</MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <span>Content</span>
      </MastheadContent>
    </Masthead>
  );
  return (
    <Page sidebar={null} mainContainerId={mainContentId} header={header}>
      <PageSection variant={PageSectionVariants.light}>{children}</PageSection>
    </Page>
  );
}
