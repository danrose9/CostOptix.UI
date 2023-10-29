import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { INewCostContainer, ContainerAction } from '../../../../types/container-types';
import { ButtonGroup } from '../../../__styles__/ButtonStyles';
import { useIsDemo } from 'src/components/hoc/withDemo';

interface ICostContainerProfileProps {
  isQueryValid: boolean;
  handleSaveContainer: (container: INewCostContainer) => void;
  activeContainer: INewCostContainer | null;
  handleContainerAction?: (id: string | null, action: ContainerAction) => void;
}

export const CostContainerProfile: React.FC<ICostContainerProfileProps> = ({
  isQueryValid,
  handleSaveContainer,
  activeContainer,
  handleContainerAction,
}) => {
  const [container, setContainer] = useState({
    name: activeContainer ? activeContainer.name : '',
    owner: activeContainer ? activeContainer.owner : '',
    description: activeContainer ? activeContainer.description : '',
  });

  const handleContainerChange = (key: string, value: string) => {
    setContainer({
      ...container,
      [key]: value,
    });
    setSaveButtonDisabled(false);
  };

  const isDemo = useIsDemo();
  const [saveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(true);

  const handleSaveBuilder = (e: any) => {
    if (isDemo) return;
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
        analysis within a cloud environment. They provide a convenient way to track and monitor costs, trends, and other
        cost-related information.
      </p>
      <p>
        With Cost Containers you can gain insights into your cloud spending patterns, identify cost-saving
        opportunities, and allocate expenses accurately across different teams or projects. The granular visibility into
        costs helps optimize resource allocation, control budget, and make informed decisions to maximize the value of
        cloud investments.
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
        <ButtonGroup>
          <Button positive disabled={saveButtonDisabled} onClick={handleSaveBuilder}>
            Save
          </Button>
          <Button onClick={() => handleContainerAction && handleContainerAction(null, ContainerAction.CLOSE)}>
            Close
          </Button>
        </ButtonGroup>
      </Form>
    </div>
  );
};

export default CostContainerProfile;
