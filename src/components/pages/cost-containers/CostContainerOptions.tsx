import React, { useState } from 'react';
import { Dropdown, Modal, Button } from 'semantic-ui-react';
import { ICostContainer, ContainerAction } from '../../../types/container-types';
import { deleteCostContainerById } from '../../../services/redux/thunks/costContainerThunk';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../services/redux/store';
import { useIsDemo } from '../../hoc/withDemo';

interface ICostContainerOptionsProps {
  container: ICostContainer;
  handleContainerAction: (id: string | null, action: ContainerAction) => void;
}

const CostContainerOptions: React.FC<ICostContainerOptionsProps> = ({ container, handleContainerAction }) => {
  const [open, setOpen] = useState(false);
  const isDemo = useIsDemo();
  const dispatch = useDispatch();

  const handleRemoveContainer = () => {
    if (!container.id) return console.error('No container id');
    dispatch<AppDispatch>(deleteCostContainerById({ id: container.id }));
    setOpen(false);
  };

  return (
    <>
      <Dropdown.Item
        icon="edit"
        text="Edit"
        onClick={() => handleContainerAction && handleContainerAction(container.id, ContainerAction.EDIT)}
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
          <Button positive onClick={handleRemoveContainer} disabled={isDemo}>
            Yes, bin it!
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default CostContainerOptions;
