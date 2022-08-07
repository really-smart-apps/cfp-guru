import {
  Nav,
  NavItem,
  NavList,
  Page,
  PageHeader,
  PageSection,
  PageSectionVariants,
} from "@patternfly/react-core";
import { AppTabs } from "../enum/appTabs";
import { NavLink } from "react-router-dom";
interface IAppLayout {
  children: React.ReactNode;
}
export const mainContentId = "main-content-page-layout";

export function AppLayout({ children }: IAppLayout) {
  const logoProps = {
    href: "/",
  };

  const PageNav = (
    <Nav
      className="home-tabs"
      id="nav-primary-simple"
      aria-label="Nav"
      variant="horizontal"
    >
      <NavList id="nav-list-simple">
        <NavItem itemId={AppTabs.HOME.id}>
          <NavLink to={`${AppTabs.HOME.path}`}>{AppTabs.HOME.label}</NavLink>
        </NavItem>
        <NavItem itemId={AppTabs.CFP_FORM.id}>
          <NavLink to={`${AppTabs.CFP_FORM.path}`}>
            {AppTabs.CFP_FORM.label}
          </NavLink>
        </NavItem>
        <NavItem itemId={AppTabs.ABOUT_US.id}>
          <NavLink to={`${AppTabs.ABOUT_US.path}`}>
            {AppTabs.ABOUT_US.label}
          </NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );
  const Header = (
    <PageHeader
      logoProps={logoProps}
      logo="Logo"
      className="cfp-guru-navbar"
      topNav={PageNav}
    />
  );
  return (
    <Page mainContainerId={mainContentId} header={Header}>
      <PageSection variant={PageSectionVariants.light}>{children}</PageSection>
    </Page>
  );
}
