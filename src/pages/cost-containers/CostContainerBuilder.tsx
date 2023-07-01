import React, { Fragment } from 'react';
import { Button, Modal, Table, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const AddNewContainerRow = styled(Table.Row)`
  cursor: pointer;
  color: #a9a9a9;
`;

export interface ICostContainerBuilderProps {}

const AddNewContainer = () => {
  return (
    <>
      <Table.Cell width="16">
        <Icon name="add" size="large" /> Add Container
      </Table.Cell>
    </>
  );
};

export function CostContainerBuilder(props: ICostContainerBuilderProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Modal
      centered={false}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={
        <AddNewContainerRow>
          <AddNewContainer />
        </AddNewContainerRow>
      }
    >
      <Modal.Header>Container Query Builder</Modal.Header>
      <Modal.Content>
        <Modal.Description>Create a new Cost Container</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>OK</Button>
      </Modal.Actions>
    </Modal>
  );
}

export default CostContainerBuilder;
