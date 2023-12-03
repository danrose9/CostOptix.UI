import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import { StyledIcon } from './Button.styles';

export interface IInformationButtonProps {
  content?: string;
}

export const InformationButton: React.FC<IInformationButtonProps> = ({ content }) => {
  return (
    <Popup
      trigger={<Icon className="information-icon" name="info circle" as={StyledIcon} data-testid="info-icon" />}
      content={content}
      basic
      position="top left"
    />
  );
};

export default InformationButton;
