import React from 'react';
import { PageContainer, HomePageMainContent } from '../__styles__/HomePageStyles';
import { Header, Container } from 'semantic-ui-react';
import { TermsOfService } from 'src/app/constants';
import { TITLE } from 'src/app/constants/application';
import styled from 'styled-components';
import HomePageNav from '../navbar/HomePageNav';

const StyledDiv = styled.div`
  line-height: 1.5em;
  font-size: 1.2rem;
`;

const StyledContainer = styled(Container)`
  padding-bottom: 5em;
`;

export const OrderedList = styled.ol`
  list-style-type: none;
  margin-left: 2em;
  font-family: 'system-ui';
`;

interface ILegalNoticeProps {
  title: string;
  content: string;
}

export const LegalNotice: React.FC<ILegalNoticeProps> = ({ title, content }) => {
  return (
    <>
      <PageContainer fluid>
        <HomePageNav className="nav-border" />
        <Header as="h1" textAlign="center">
          {title}
        </Header>
        <HomePageMainContent className="center">
          <StyledDiv>
            <StyledContainer>{content}</StyledContainer>
          </StyledDiv>
        </HomePageMainContent>
      </PageContainer>
    </>
  );
};

export default LegalNotice;
