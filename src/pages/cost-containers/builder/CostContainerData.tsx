import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { INewCostContainer } from '../../../types/container-types';

const StyledForm = styled(Form)`
  font-family: Poppins;
`;

interface ICostContainerDataProps {
  isQueryValid: boolean;
  handleAddContainer: (container: INewCostContainer) => void;
}

export const CostContainerData: React.FC<ICostContainerDataProps> = ({
  isQueryValid,

  handleAddContainer,
}) => {
  const [container, setContainer] = useState({
    name: '',
    owner: '',
    description: '',
  });

  const handleContainerChange = (key: string, value: string) => {
    setContainer({
      ...container,
      [key]: value,
    });
  };

  const [addButtonDisabled, setAddButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (isQueryValid && container.name) {
      setAddButtonDisabled(false);
    } else {
      setAddButtonDisabled(true);
    }
  }, [isQueryValid, container.name]);

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
          value={container.name}
          onChange={(e) => handleContainerChange('name', e.target.value)}
        />
        <StyledForm.TextArea
          label="Container Description"
          placeholder="Container Description"
          value={container.description}
          onChange={(e) => handleContainerChange('description', e.target.value)}
        />
        <StyledForm.Input
          label="Owner"
          placeholder="Owner"
          icon="address card outline"
          onChange={(e) => handleContainerChange('owner', e.target.value)}
          value={container.owner}
        />

        <Button
          color="teal"
          disabled={addButtonDisabled}
          onClick={(e) => {
            e.preventDefault();
            handleAddContainer({
              name: container.name,
              owner: container.owner,
              description: container.description,
            });
          }}
        >
          Add
        </Button>
      </Form>
    </div>
  );
};

export default CostContainerData;
