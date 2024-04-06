import React, { useState } from 'react';
import { Modal, Button, Header, Icon, Form, Message } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/services/redux/rootReducer';
import { reduxState } from 'src/services/redux/reduxState';
import { useLogout } from 'src/hooks/useLogout';
import * as appRoutes from '../../app/router/appRoutes';
import { useNavigate } from 'react-router-dom';
import { deleteOrganization } from 'src/services/api/deleteOrganization';
import WarningMessage from '../messages/WarningMessage';

interface IDeleteAccountProps {}

const DeleteAccountModal: React.FunctionComponent<IDeleteAccountProps> = () => {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { logout } = useLogout();

  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  const { organization } = useSelector((state: IRootState) => state[reduxState.USER_PROFILE]);

  const handleClick = async () => {
    setSecondOpen(true);

    const response = await deleteOrganization();

    // Add delayed response
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Check if the response is 204 (No Content) which indicates successful deletion
    if (response && response.status === 204) {
      await logout();
      navigate(appRoutes.HOME);
    } else {
      setShowWarning(true);
      console.error('Failed to delete the organization after 3 retries', response.data);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Modal
      data-testid="delete-account-modal"
      onClose={() => setFirstOpen(false)}
      onOpen={() => setFirstOpen(true)}
      open={firstOpen}
      size="small"
      trigger={
        <Button color="red" data-testid="delete-account-button">
          Delete Account
        </Button>
      }
    >
      <Header>
        <Icon name="trash alternate" />
        Delete CostOptix Account
      </Header>
      <Modal.Content>
        <p>
          All data related to your organization will be permanently removed from CostOptix. We also recommend reviewing
          any associated cloud providers to ensure there are no residual permissions or data. <br />
          <br />
          Type in the name of your organization, <strong>{organization.name}</strong>, to continue.
        </p>
        <Form>
          <Form.Field data-testid="organization-name-input">
            <input placeholder="Organization Name" value={inputValue} onChange={handleInputChange} />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Content>
        {showWarning && <WarningMessage content="Oops! that didn't seems to work, try again" />}
      </Modal.Content>
      <Modal.Actions>
        <Button data-testid="return-button" basic color="green" onClick={() => setFirstOpen(false)}>
          <Icon name="remove" /> Return
        </Button>
        <Button
          data-testid="delete-button"
          color="red"
          onClick={handleClick}
          disabled={inputValue !== organization.name}
        >
          <Icon name="checkmark" />
          Remove Account
        </Button>
      </Modal.Actions>
      <Modal
        onClose={() => setSecondOpen(false)}
        open={secondOpen}
        size="small"
        closeOnDocumentClick={false}
        closeOnDimmerClick={false}
        closeOnEscape={false}
      >
        <Message icon>
          <Icon name="circle notched" loading color="green" />
          <Message.Content>
            <Message.Header>Sorry to see you go!</Message.Header>
            Just one second we are now removing all data for {organization.name} from our systems.
          </Message.Content>
        </Message>
      </Modal>
    </Modal>
  );
};

export default DeleteAccountModal;
