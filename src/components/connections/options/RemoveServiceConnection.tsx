import React, { useState } from 'react';
import { useAppDispatch } from '../../../services/redux/store';
import { Modal, Button, Dropdown } from 'semantic-ui-react';
import { deleteBillingAccount } from '../../../services/redux/thunks/serviceProvidersThunk';

interface IRemoveServiceConnectionProps {
  providerId: string;
  id: string;
  isDemo?: boolean;
}

export const RemoveServiceConnection: React.FC<IRemoveServiceConnectionProps> = ({ providerId, id, isDemo }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleRemoveConnection = () => {
    const args = {
      id: id,
      providerId: providerId,
    };

    dispatch(deleteBillingAccount(args));
    setOpen(false);
  };

  return (
    <>
      <Modal
        trigger={<Dropdown.Item icon="trash" text="Remove" disabled={isDemo} />}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>Remove Service Connection</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to permanently remove this service connection?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button negative onClick={handleRemoveConnection}>
            Continue
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default RemoveServiceConnection;
