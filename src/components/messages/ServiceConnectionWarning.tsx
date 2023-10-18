import React from 'react';
import { Message } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledMessage = styled(Message)`
  margin: 0;
  padding: 0.7em;
`;

interface ServiceConnectionWarningProps {
  content: string;
}

const ServiceConnectionWarning: React.FC<ServiceConnectionWarningProps> = ({ content }) => {
  return (
    <>
      <StyledMessage warning content={content} size="small" />
    </>
  );
};

export default ServiceConnectionWarning;
