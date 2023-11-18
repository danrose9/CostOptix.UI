import React, { FormEvent, useState } from 'react';
import { Modal, Button, CheckboxProps, Checkbox, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import * as images from '../../assets';
import { STORAGE } from '../../app/constants/StorageKeys';
import { withOutDemo } from '../hoc/withDemo';
import { ExternalWelcomeDescription, DemoWelcomeDescription } from './WelcomeDescription';

interface WelcomeModalProps {
  setDismissWelcomePageCallback: (val: boolean) => void;
  isDemo?: boolean;
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

const ContentWrapper = styled.div`
  p {
    /* Styles for <p> tags when inside ContentWrapper */
    font-size: 1.1em;
  }
`;

const WelcomeModal: React.FC<WelcomeModalProps> = ({ setDismissWelcomePageCallback, isDemo }) => {
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

  const DoNotShowCheckbox = () => {
    return <Checkbox label="Don't show again" onChange={handleCheckbox} />;
  };

  const DoNotShowCheckBoxWithOutDemo = withOutDemo(DoNotShowCheckbox);

  return (
    <StyledModal open={isOpen} size="large">
      <Modal.Header>Welcome to CostOptix</Modal.Header>
      <Modal.Content image>
        <Image size="medium" src={images.CHECKLIST} />
        <ContentWrapper>{isDemo ? <DemoWelcomeDescription /> : <ExternalWelcomeDescription />}</ContentWrapper>
      </Modal.Content>
      <ActionButtons>
        <ButtonWrapper>
          <DoNotShowCheckBoxWithOutDemo />
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
