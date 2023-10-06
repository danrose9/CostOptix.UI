import * as React from 'react';
import { Tab, Table, Divider } from 'semantic-ui-react';
import { SectionTitle, SectionHeader, SimpleButton } from '../../__styles__/settings.styles';
import { formatISODateToUTCDate } from '../../../utils/dateFormatter';
import styled from 'styled-components';
import { ActionButton } from '../../buttons';

const ActionButtons = styled.div`
  display: table;
  cursor: pointer;
`;

interface IOrganizationProps {}

const organizationList = [
  {
    organizationName: 'Red Dog',
    joined: '2023-02-12T18:01:52.918324',
  },
  {
    organizationName: 'Red Dog Development',
    joined: '2023-02-03T18:01:52.918324',
  },
];

const Organizations = (props: IOrganizationProps) => {
  return (
    <Tab.Pane color="blue">
      <SectionHeader>
        <SectionTitle>Organizations</SectionTitle>
        <SimpleButton>+ Add</SimpleButton>
      </SectionHeader>
      <Divider />

      <Table celled fixed singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={9}>Name</Table.HeaderCell>

            <Table.HeaderCell width={5}>Joined</Table.HeaderCell>
            <Table.HeaderCell width={2} />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {organizationList.map((organization: any, index) => {
            var dateJoined = formatISODateToUTCDate(organization.joined);
            return (
              <Table.Row key={index}>
                <Table.Cell>{organization.organizationName}</Table.Cell>
                <Table.Cell>{dateJoined}</Table.Cell>
                <Table.Cell collapsing>
                  <ActionButtons>
                    <ActionButton name="edit outline" color="grey" content="edit" onClick={() => {}} />
                    <ActionButton name="trash alternate outline" color="grey" content="delete" onClick={() => {}} />
                  </ActionButtons>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Tab.Pane>
  );
};

export default Organizations;
