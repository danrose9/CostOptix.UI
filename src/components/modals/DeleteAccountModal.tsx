import React, { useState } from 'react';
import { Modal, Button, Header, Icon, Form } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/services/redux/rootReducer';
import { reduxState } from 'src/services/redux/reduxState';
import { Logout } from '../../components/auth/Logout';
import * as appRoutes from '../../app/router/appRoutes';
import { useNavigate } from 'react-router-dom';

interface IDeleteAccountProps {}

const DeleteAccountModal: React.FunctionComponent<IDeleteAccountProps> = () => {
  const [open, setOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate();

  const { organization } = useSelector((state: IRootState) => state[reduxState.USER_PROFILE]);

  const handleClick = () => {
    setPendingDelete(true);
    // TODO: Delete account
    Logout();
    navigate(appRoutes.HOME);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Modal
      // basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={<Button color="red">Delete Account</Button>}
    >
      <Header icon>
        <Icon name="trash" />
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
          <Form.Field>
            <input placeholder="Organization Name" value={inputValue} onChange={handleInputChange} />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="green" onClick={() => setOpen(false)}>
          <Icon name="remove" /> Return
        </Button>
        <Button color="red" onClick={handleClick} loading={pendingDelete} disabled={inputValue !== organization.name}>
          <Icon name="checkmark" /> Continue
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteAccountModal;
