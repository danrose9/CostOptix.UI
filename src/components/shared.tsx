import React, { ReactNode } from 'react';
import { Icon } from 'semantic-ui-react';

export interface statusType {
  Pending: ReactNode;
  Connected: ReactNode;
  Disabled: ReactNode;
  Failed: ReactNode;
  Expired: ReactNode;
}

export const billingAccountStatus = {
  Pending: <Icon color="grey" name="wait" size="large" />,
  Connected: <Icon color="green" name="checkmark" size="large" />,
  Disabled: <Icon color="orange" name="close" size="large" />,
  Failed: <Icon color="red" name="close" size="large" />,
  Expired: <Icon color="orange" name="clock outline" size="large" />,
} as statusType;
