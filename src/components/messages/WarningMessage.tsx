import React from 'react';
import { Message } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledMessage = styled(Message)`
  margin: 0;
  padding: 0.7em;
`;

interface WarningMessageProps {
  header?: string;
  content: string;
}

const WarningMessage: React.FC<WarningMessageProps> = ({ content, header }) => {
  return (
    <>
      <StyledMessage warning icon="warning" header={header} content={content} size="small" />
    </>
  );
};

export default WarningMessage;
