import * as React from 'react';
import { Segment, Form } from 'semantic-ui-react';
import { SectionTitle, StyledFormField } from '../../__styles__/settings.styles';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  font-family: Poppins;
`;

interface ICostContainerResourceData {}

export interface ICostContainerDataProps {}

export function CostContainerData(props: ICostContainerDataProps) {
  const [containerName, setContainerName] = React.useState<string>('');
  const [containerOwner, setContainerOwner] = React.useState<string>('');

  const handleContainerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContainerName(event.target.value);
  };

  const handleContainerOwnerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContainerOwner(event.target.value);
  };

  return (
    <div>
      <p>
        Cost Containers are a virtual grouping of cloud resources designed to facilitate efficient cost management and
        analysis within a cloud environment they provide a convenient way to track and monitor costs, trends, and other
        cost-related information.
      </p>
      <p>
        They allow you to gain insights into your cloud spending patterns, identify cost-saving opportunities, and
        allocate expenses accurately across different teams or projects. The granular visibility into costs helps
        optimize resource allocation, control budget, and make informed decisions to maximize the value of cloud
        investments.
      </p>
      <p>Use the query builder to create containers based on providers, organizations and other fields.</p>

      <Form size="small">
        <StyledForm.Input
          label="Container Name"
          placeholder="Container Name"
          icon="folder outline"
          value={containerName}
          onChange={handleContainerNameChange}
        />
        <StyledForm.TextArea label="Container Description" placeholder="Container Description" />
        <StyledForm.Input
          label="Owner"
          placeholder="Owner"
          icon="address card outline"
          onChange={handleContainerOwnerChange}
          value={containerOwner}
        />

        <Button color="teal" disabled={false}>
          Add
        </Button>
      </Form>
    </div>
  );
}
