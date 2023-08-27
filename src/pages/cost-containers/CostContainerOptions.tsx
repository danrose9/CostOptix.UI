import React, { useState } from 'react';
import { Dropdown, Modal, Button } from 'semantic-ui-react';
import { ICostContainer } from '../../types/container-types';
import { deleteCostContainerById } from '../../services/redux/thunks/costContainerThunk';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/redux/store';

interface ICostContainerOptionsProps {
  container: ICostContainer;
  handleEditContainer: (id: string | null) => void;
}

const CostContainerOptions: React.FC<ICostContainerOptionsProps> = ({ container, handleEditContainer }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleRemoveContainer = () => {
    if (!container.id) return console.error('No container id');
    dispatch<AppDispatch>(deleteCostContainerById({ id: container.id }));
    setOpen(false);
  };

  return (
    <>
      <Dropdown.Item
        icon="bell slash outline"
        text="Edit"
        onClick={() => handleEditContainer && handleEditContainer(container.id)}
      />
      <Modal
        trigger={<Dropdown.Item icon="trash" text="Delete" />}
        size="small"
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>Logout</Modal.Header>
        <Modal.Content>
          <p>You are about to delete Cost Container X, do you wish to continue?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>No thanks, let's keep it</Button>
          <Button positive onClick={handleRemoveContainer}>
            Yes, bin it!
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default CostContainerOptions;
