import React, { Fragment } from 'react';
import { Button, Modal, Table, Icon, Container, Segment } from 'semantic-ui-react';
import styled from 'styled-components';

const AddNewContainerRow = styled(Table.Row)`
  cursor: pointer;
  color: #a9a9a9;
`;

export interface ICostContainerBuilderProps {}

export function CostContainerBuilder(props: ICostContainerBuilderProps) {
  const [open, setOpen] = React.useState(false);
  return <Segment>Pellentesque habitant morbi tristique senectus.</Segment>;
}

export default CostContainerBuilder;
