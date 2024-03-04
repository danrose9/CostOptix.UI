import * as React from 'react';
import { Breadcrumb as SemanticBreadcrumb } from 'semantic-ui-react';
import styled from 'styled-components';

const BREADCRUMB_ICON = 'right angle';

const StyledBreadcrumb = styled(SemanticBreadcrumb)`
  padding: 0 0 1em 0;
`;
export type BreadcrumbSection = {
  key: string;
  content: string;
  link?: boolean;
  active?: boolean;
};

interface IBreadcrumbProps {
  sections: BreadcrumbSection[];
}

const Breadcrumb: React.FC<IBreadcrumbProps> = ({ sections }) => {
  return <StyledBreadcrumb icon={BREADCRUMB_ICON} sections={sections}></StyledBreadcrumb>;
};

export const buildBreadcrumbSections = ({
  showGetStarted,
  category,
  documentRecord,
}: {
  showGetStarted: boolean;
  category?: string;
  documentRecord?: { document?: { title?: string } };
}): BreadcrumbSection[] => {
  const sections: BreadcrumbSection[] = [{ key: 'HelpCenter', content: 'Help Center', link: true }];

  if (showGetStarted) {
    sections.push({ key: 'GetStarted', content: 'Get Started', active: true });
  } else {
    if (category) {
      sections.push({ key: 'Category', content: category, link: true });
    }

    if (documentRecord && documentRecord.document && documentRecord.document.title) {
      sections.push({ key: 'DocumentTitle', content: documentRecord.document.title.toString(), active: true });
    } else {
      // Ensure the last section is marked active correctly
      const lastSection = sections[sections.length - 1];
      lastSection.active = true;
      delete lastSection.link; // Remove link property for the active breadcrumb
    }
  }

  return sections;
};

export default Breadcrumb;
