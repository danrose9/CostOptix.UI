import React from 'react';
import { Tab, Table, Divider } from 'semantic-ui-react';
import { SectionTitle, SectionHeader, SimpleButton } from '../../__styles__/settings.styles';

interface IUsersProps {}

// enum role {
//   User = 1,
//   Admin = 2,
// }

// type UserListType = {
//   name: string;
//   email: string;
//   role: role;
//   joined: Date;
// };

const userList = [
  {
    name: 'David Johnston',
    email: 'david.Johnston@mycompany.com',
    role: 'Admin',
    joined: '2023-02-12T18:01:52.918324',
  },
  {
    name: 'Sally Marsh',
    email: 'sally.marsh@mycompany.com',
    role: 'User',
    joined: '2023-02-12T18:01:52.918324',
  },
];

const Users = (props: IUsersProps) => {
  return (
    <Tab.Pane color="blue">
      <SectionHeader>
        <SectionTitle>Users</SectionTitle>
        <SimpleButton>+ Invite</SimpleButton>
      </SectionHeader>
      <Divider />

      <Table celled fixed singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={4}>Name</Table.HeaderCell>
            <Table.HeaderCell width={5}>Email</Table.HeaderCell>
            <Table.HeaderCell width={3}>Role</Table.HeaderCell>
            <Table.HeaderCell width={4}>Joined</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {userList.map((user: any, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell>{user.joined}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Tab.Pane>
  );
};

export default Users;
