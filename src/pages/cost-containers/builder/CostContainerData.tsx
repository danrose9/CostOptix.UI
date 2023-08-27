import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { INewCostContainer } from '../../../types/container-types';
import { SpaceBetweenButtonGroup } from '../../../components/__styles__/ButtonStyles';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../services/redux/store';
import { fetchCostContainers } from '../../../services/redux/thunks/costContainerThunk';

const StyledForm = styled(Form)`
  font-family: inherit;
`;

interface ICostContainerDataProps {
  isQueryValid: boolean;
  handleSaveContainer: (container: INewCostContainer) => void;
  toggleContainerList: (value: boolean) => void;
  activeContainer: INewCostContainer | null;
}

export const CostContainerData: React.FC<ICostContainerDataProps> = ({
  isQueryValid,
  toggleContainerList,
  handleSaveContainer,
  activeContainer,
}) => {
  const [container, setContainer] = useState({
    name: activeContainer ? activeContainer.name : '',
    owner: activeContainer ? activeContainer.owner : '',
    description: activeContainer ? activeContainer.description : '',
  });

  const dispatch = useDispatch();

  const handleContainerChange = (key: string, value: string) => {
    setContainer({
      ...container,
      [key]: value,
    });
    setSaveButtonDisabled(false);
  };

  const [saveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(true);

  const handleCloseBuilder = (e: any) => {
    e.preventDefault();
    toggleContainerList(false);
    dispatch<AppDispatch>(fetchCostContainers());
  };

  const handleSaveBuilder = (e: any) => {
    e.preventDefault();
    handleSaveContainer({
      id: activeContainer ? activeContainer.id : '',
      name: container.name,
      owner: container.owner,
      description: container.description,
    });
    setSaveButtonDisabled(true);
  };

  useEffect(() => {
    if (isQueryValid && container.name) {
      setSaveButtonDisabled(false);
    } else {
      setSaveButtonDisabled(true);
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

      <Form>
        <Form.Input
          label="Container Name"
          placeholder="Container Name"
          icon="folder outline"
          value={container.name}
          onChange={(e) => handleContainerChange('name', e.target.value)}
        />
        <Form.TextArea
          label="Container Description"
          placeholder="Container Description"
          value={container.description}
          onChange={(e) => handleContainerChange('description', e.target.value)}
        />
        <Form.Input
          label="Owner"
          placeholder="Owner"
          icon="address card outline"
          onChange={(e) => handleContainerChange('owner', e.target.value)}
          value={container.owner}
        />
        <SpaceBetweenButtonGroup>
          <Button color="teal" disabled={saveButtonDisabled} onClick={handleSaveBuilder}>
            Save
          </Button>
          <Button color="teal" onClick={handleCloseBuilder}>
            Close
          </Button>
        </SpaceBetweenButtonGroup>
      </Form>
    </div>
  );
};

export default CostContainerData;
