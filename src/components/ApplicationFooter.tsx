import * as React from 'react';
import styled from 'styled-components';
import { COLORS, FONT } from '../app/constants';
import { APP_FOOTER } from '../app/constants';

const StyledFooter = styled.div`
  height: 1.5em;
  background-color: ${COLORS.PRIMARY};
  & p {
    font-size: 0.8em;
    color: ${FONT.WHITE};
    text-align: right;
    @media only screen and (max-width: 600px) {
      text-align: center;
    }
  }
`;
interface IApplicationFooterProps {
  content?: string;
}

const ApplicationFooter: React.FC<IApplicationFooterProps> = ({ content }) => {
  return (
    <StyledFooter>
      <p>{APP_FOOTER.CONTENT}</p>
    </StyledFooter>
  );
};

export default ApplicationFooter;
