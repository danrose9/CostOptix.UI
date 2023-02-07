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
  Pending: <Icon color="grey" name="sync" size="large" loading />,
  Connected: <Icon color="green" name="checkmark" size="large" />,
  Disabled: <Icon color="orange" name="bell slash outline" size="large" />,
  Failed: <Icon color="red" name="cancel" size="large" />,
  Expired: <Icon color="orange" name="cancel" size="large" />,
} as statusType;
