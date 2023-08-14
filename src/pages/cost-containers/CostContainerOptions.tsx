import React, { useState } from 'react';
import { Dropdown, Modal, Button } from 'semantic-ui-react';
import { ContainersType } from './CostContainerTable';
import { deleteCostContainerById } from '../../services/api/fetchCostContainer';

interface ICostContainerOptionsProps {
  container: ContainersType;
}

const CostContainerOptions: React.FC<ICostContainerOptionsProps> = ({ container }) => {
  const [open, setOpen] = useState(false);

  const handleRemoveContainer = () => {
    deleteCostContainerById(container.id);
    setOpen(false);
  };

  return (
    <>
      <Dropdown.Item icon="bell slash outline" text="Edit" />
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
