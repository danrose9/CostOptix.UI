import React from 'react';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';

const ModalDescription = styled(Modal.Description)`
  /* Styles for Modal.Description */
  font-size: 1.3em;
  margin-bottom: 1em;
`;

export const ExternalWelcomeDescription = () => {
  return (
    <>
      <ModalDescription>Getting Started</ModalDescription>
      <p>
        Welcome to CostOptix, your gateway to insightful cloud spending analysis, empowering you to make cost-effective
        decisions with your cloud providers.
      </p>
      <p>
        Since this is your organization's first login, we'll attempt to compile some initial cloud costs based on your
        Azure account.
      </p>
      <p>
        This may be somewhat limited initially due to access, so we highly recommend you create a new connection via our
        Service Connection page and follow our tour to maximize your experience with CostOptix.
      </p>
    </>
  );
};

export const DemoWelcomeDescription = () => {
  return (
    <>
      <ModalDescription>Getting Started with CostOptix Demo</ModalDescription>
      <p>
        Welcome to CostOptix Demo, your gateway to insightful cloud spending analysis, empowering you to make
        cost-effective decisions with your cloud providers.
      </p>

      <p>
        This demo will give you full access to all features of CostOptix, but please note that the data presented to you
        is a not real and is only a demonstration of what you can expect to see with your own data.
      </p>
      <p>
        We highly recommend you take the tour to maximize your experience with CostOptix. If you have any questions then
        you can contact us by clicking the help link in the top right corner of the applicaion.
      </p>
    </>
  );
};
