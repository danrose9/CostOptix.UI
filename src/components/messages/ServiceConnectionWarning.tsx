import React from 'react';
import { Message } from 'semantic-ui-react';

interface ServiceConnectionWarningProps {
  content: string;
}

const ServiceConnectionWarning: React.FC<ServiceConnectionWarningProps> = ({ content }) => {
  return (
    <>
      <Message warning content={content} size="small" style={{ margin: 0, padding: '0.7em' }} />
    </>
  );
};

export default ServiceConnectionWarning;
