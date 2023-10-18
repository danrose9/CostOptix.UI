import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import styled from 'styled-components';

export interface IInformationButtonProps {
  content?: string;
}

const StyledIcon = styled(Icon)`
  color: #3f6fbe;
  cursor: pointer;
  padding-left: 0.5em;
`;

export function InformationButton(props: IInformationButtonProps) {
  const { content } = props;
  /* Using styled components pushes the tooltip to top of page */

  return (
    <Popup
      trigger={<Icon name="info circle" as={StyledIcon} data-testid="info-icon" />}
      content={content}
      basic
      position="top left"
    />
  );
}

export default InformationButton;
