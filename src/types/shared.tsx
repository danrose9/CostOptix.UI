import React, { ReactNode } from 'react';
import { Icon, SemanticCOLORS } from 'semantic-ui-react';

export interface IBillingAccountStatus {
  New: ReactNode;
  Pending: ReactNode;
  Connected: ReactNode;
  Disabled: ReactNode;
  Failed: ReactNode;
  Expired: ReactNode;
  Transient: ReactNode;
}

export const billingAccountColorType = {
  New: 'olive' as SemanticCOLORS | undefined,
  Pending: 'orange' as SemanticCOLORS | undefined,
  Connected: 'green' as SemanticCOLORS | undefined,
  Disabled: 'teal' as SemanticCOLORS | undefined,
  Failed: 'red' as SemanticCOLORS | undefined,
  Expired: 'black' as SemanticCOLORS | undefined,
  Transient: 'blue' as SemanticCOLORS | undefined,
};

export const billingAccountStatusType = {
  New: <Icon color={billingAccountColorType.New} name="file alternate outline" size="large" />,
  Pending: <Icon color={billingAccountColorType.Pending} name="sync" size="large" loading />,
  Connected: <Icon color={billingAccountColorType.Connected} name="checkmark" size="large" />,
  Disabled: <Icon color={billingAccountColorType.Disabled} name="warning sign" size="large" />,
  Failed: <Icon color={billingAccountColorType.Failed} name="close" size="large" />,
  Expired: <Icon color={billingAccountColorType.Expired} name="clock outline" size="large" />,
  Transient: <Icon color={billingAccountColorType.Transient} name="exchange" size="large" />,
} as IBillingAccountStatus;
