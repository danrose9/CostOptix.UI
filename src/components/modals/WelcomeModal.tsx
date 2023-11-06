import React, { FormEvent, useState } from 'react';
import { Modal, Button, CheckboxProps, Checkbox, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import * as images from '../../assets';
import { STORAGE } from '../../app/constants/StorageKeys';

interface WelcomeModalProps {
  setDismissWelcomePageCallback: (val: boolean) => void;
}

const StyledModal = styled(Modal)``;

const ActionButtons = styled(Modal.Actions)`
  &&& {
    display: flex;
    justify-content: space-between;
  }
`;

const ButtonWrapper = styled.div`
  align-self: center;
`;

const ModalDescription = styled(Modal.Description)`
  /* Styles for Modal.Description */
  font-size: 1.3em;
  margin-bottom: 1em;
`;

const ContentWrapper = styled.div`
  p {
    /* Styles for <p> tags when inside ContentWrapper */
    font-size: 1.1em;
  }
`;

const WelcomeModal: React.FC<WelcomeModalProps> = ({ setDismissWelcomePageCallback }) => {
  const [isOpen, setIsOpen] = useState(true);

  // eslint-disable-next-line
  const [hideWelcomePage, setHideWelcomePage] = useState<boolean>(false);

  const handleDismiss = () => {
    setDismissWelcomePageCallback(true);
    setIsOpen(false);
  };

  const handleCheckbox = (event: FormEvent<HTMLInputElement>, data: CheckboxProps) => {
    if (data.checked !== undefined) {
      localStorage.setItem(STORAGE.HIDE_WELCOME_PAGE, data.checked.toString());
      setHideWelcomePage(data.checked);
    }
  };

  return (
    <StyledModal open={isOpen} size="large">
      <Modal.Header>Welcome to CostOptix</Modal.Header>
      <Modal.Content image>
        <Image size="medium" src={images.CHECKLIST} />
        <ContentWrapper>
          <ModalDescription>Getting Started</ModalDescription>
          <p>
            Welcome to CostOptix, your gateway to insightful cloud spending analysis, empowering you to make
            cost-effective decisions with your cloud providers.
          </p>
          <p>
            Since this is your organization's first login, we'll attemp to compile some initial cloud costs based on
            your Azure account.
          </p>
          <p>
            This may be somewhat limited initially due to access, so we highly recommend you create a new connection via
            our Service Connection page and follow our tour to maximize your experience with CostOptix.
          </p>
        </ContentWrapper>
      </Modal.Content>
      <ActionButtons>
        <ButtonWrapper>
          <Checkbox label="Don't show again" onChange={handleCheckbox} />
        </ButtonWrapper>
        <ButtonWrapper>
          <Button onClick={handleDismiss}>Dismiss</Button>
          <Button color="green">Begin Tour</Button>
        </ButtonWrapper>
      </ActionButtons>
    </StyledModal>
  );
};

export default WelcomeModal;
