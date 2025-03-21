import React from 'react';
import { Tab, Label, List, Divider, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { changeLogItems } from '../../changeLogData';
import { formatDateFull } from '../../../utils/helper';
import { SectionHeader, SectionTitle } from '../../__styles__/settings.styles';
import { APP } from '../../../app/constants';

const ListItem = styled.li`
  font-weight: 400;
  padding-left: 2rem;
`;

export const ChangeLog = () => {
  return (
    <>
      <Tab.Pane color="blue">
        <SectionHeader>
          <SectionTitle>Change Log</SectionTitle>

          <Label size="large" color="teal">
            Application Version: {APP.VERSION}
          </Label>
        </SectionHeader>
        <Divider />
        {changeLogItems.map((item, index) => {
          return (
            <List key={index}>
              <Label size="medium" color="blue">
                {item.version}
              </Label>{' '}
              - {formatDateFull(item.date)}
              {item.changes.map((item, index) => {
                return (
                  <ListItem key={index}>
                    <Icon name="triangle right" />
                    {item}
                  </ListItem>
                );
              })}
            </List>
          );
        })}
      </Tab.Pane>
    </>
  );
};

export default ChangeLog;
