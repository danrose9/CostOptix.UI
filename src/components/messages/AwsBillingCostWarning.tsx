import React from 'react';
import { Message, Icon, Checkbox } from 'semantic-ui-react';

interface AwsBillingCostWarningProps {
  onCheckboxChange: (isChecked: boolean) => void;
}

const AwsBillingCostWarning: React.FC<AwsBillingCostWarningProps> = ({ onCheckboxChange }) => {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleCheckboxChange = (event: React.FormEvent<HTMLInputElement>, data: any) => {
    const newValue = data.checked;
    setIsChecked(newValue);
    onCheckboxChange(newValue); // Notify parent of the checkbox's state
  };

  return (
    <>
      <Message color="orange" icon>
        <Icon name="info" />
        <Message.Content>
          <Message.Header>AWS Cost Information</Message.Header>
          Adding an AWS Service Connection will incur costs from Amazon to your AWS subscription. CostOptix gathers data
          once a day which is charged against your AWS account. For more information see this guide,&nbsp;
          <a href="https://aws.amazon.com/aws-cost-management/aws-cost-explorer/pricing/">AWS Cost Explorer.</a>
          <br />
          <br />
          <Checkbox
            label="I understand that CostOptix is not responsible for AWS costs"
            onChange={handleCheckboxChange}
            checked={isChecked}
          />
        </Message.Content>
      </Message>
    </>
  );
};

export default AwsBillingCostWarning;
