import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';

export interface IInformationButtonProps {
  content?: string;
}

export function InformationButton(props: IInformationButtonProps) {
  const { content } = props;
  /* Using styled components pushes the tooltip to top of page */

  return (
    <Popup
      trigger={
        <Icon
          name="info circle"
          style={{ color: '#3f6fbe', cursor: 'pointer', paddingLeft: '0.5em' }}
          data-testid="info-icon"
        />
      }
      content={content}
      basic
      position="top left"
    />
  );
}

export default InformationButton;
