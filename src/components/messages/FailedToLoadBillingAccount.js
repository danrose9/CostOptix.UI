import React from 'react';
import { Message } from 'semantic-ui-react';

export const CurrencyConflictWarning = (props) => {
  return (
    <>
      <Message
        warning
        // header="Failed to load Billing Account"
        content="An error occured while trying to retieve data for this Billing Account"
        size={props.size}
      />
    </>
  );
};

export default CurrencyConflictWarning;
