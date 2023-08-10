import React, { useState } from 'react';
import { Table, Segment, Dropdown } from 'semantic-ui-react';
import { ProviderImage } from '../../components/ProviderImage';
import { SegmentName, SegmentHeader, TableContainer } from '../__styles__/DefaultPageStyles';
import { StyledDropdown } from '../../components/__styles__/StyledQueryFilter';
import { TablePaging } from '../../components/tables/TablePaging';
import getSymbolFromCurrency from 'currency-symbol-map';
import PageLayout from '../PageLayout';
import TinyLineChart from '../../components/charts/TinyLineChart';
import { CostContainerDetail } from './CostContainerDetail';
import styled from 'styled-components';

const ComponentContainer = styled.div`
  display: flex;
  padding: 0.5em 0 1em;
`;

const ContainerDetail = styled.div`
  flex-basis: 30%;
`;

const ProviderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

interface ICostContainersListProps {
  [x: string]: any;
  name: string;
  description: string;
  created: string;
  createdBy: string;
  owner: string;
  resourceCount: number;
  monthlyCosts: string;
  currency: string;
  providers: string[];
  data: any[];
}

const costContainers = [
  {
    name: 'Software Project 1',
    description:
      'The software project currently in development is a cloud-based project management tool designed to streamline team collaboration and increase productivity by providing real-time updates and task management capabilities.',
    created: '23/05/2022',
    createdBy: 'Peter Wilson',
    owner: 'Karen Smith',
    resourceCount: 24,
    monthlyCosts: '8,726.00',
    currency: 'USD',
    providers: ['AWS', 'Azure'],
    data: [
      { value: 4000 },
      { value: 3000 },
      { value: 2000 },
      { value: 2780 },
      { value: 1890 },
      { value: 2380 },
      { value: 3980 },
    ],
  },
  {
    name: 'Software Project with a really really long name that no one is aware of',
    description:
      'Our team is developing a cutting-edge mobile application that revolutionizes how users manage their personal finances, with advanced features for budgeting, expense tracking, and investment analysis.',
    created: '03/02/2021',
    createdBy: 'Claire Jones',
    owner: 'Sally Smith',
    resourceCount: 3,
    monthlyCosts: '783.00',
    currency: 'USD',
    providers: ['Azure'],
    data: [
      { value: 1290 },
      { value: 1120 },
      { value: 2910 },
      { value: 2370 },
      { value: 2630 },
      { value: 2530 },
      { value: 2180 },
    ],
  },
  {
    name: 'Backup for IT',
    description:
      'Our software development project focuses on creating an AI-powered chatbot for customer support, capable of understanding natural language queries, providing instant responses, and escalating complex issues to human agents when necessary, improving overall service efficiency and customer engagement.',
    created: '29/11/2021',
    createdBy: 'Arnold Davis',
    owner: 'Carrie Jones',
    resourceCount: 17,
    monthlyCosts: '95, 263.00',
    currency: 'EUR',
    providers: ['AWS'],
    data: [
      { value: 14000 },
      { value: 16780 },
      { value: 19820 },
      { value: 23090 },
      { value: 27890 },
      { value: 47890 },
      { value: 65290 },
    ],
  },
  {
    name: 'SQL DB for Finance',
    description:
      'We are working on a web-based e-commerce platform that provides seamless integration with popular payment gateways, efficient inventory management, and personalized shopping experiences to enhance customer satisfaction and drive sales',
    created: '13/01/2023',
    createdBy: 'Donald Martin',
    owner: 'Harry Wells',
    resourceCount: 5,
    monthlyCosts: '23,543.00',
    currency: 'USD',
    providers: ['AWS', 'Azure'],
    data: [
      { value: 47000 },
      { value: 38500 },
      { value: 32090 },
      { value: 25780 },
      { value: 21890 },
      { value: 23880 },
      { value: 13980 },
    ],
  },
] as ICostContainersListProps[];

const tinychart = {
  width: 150,
  height: 30,
};

const containerOptions = [
  { key: 1, text: 'Add New', value: 1, icon: 'add' },
  { key: 2, text: 'Hide', value: 2, icon: 'add' },
];
const itemOptions = [
  { key: 1, text: 'Edit', value: 1, icon: 'add' },
  { key: 2, text: 'Set Budgets', value: 2, icon: 'add' },
];

const ProviderImages = (props: any) => {
  // const providers = ['AWS', 'Azure'];
  // iterate over providers and return ProviderImage component

  return (
    <ProviderContainer>
      {props.providers.map((provider: string, index: React.Key | null | undefined) => {
        return <ProviderImage key={index} provider={provider} size="mini" />;
      })}
    </ProviderContainer>
  );
};

const CostContainersList = () => {
  const currencySymbol = (currency: string) => getSymbolFromCurrency(currency);

  const [selectedContainer, setSelectedContainer] = useState<any>(costContainers[0]);

  const RenderTable = () => {
    return (
      <TableContainer style={{ flexBasis: '70%' }}>
        <Segment color="orange">
          <SegmentHeader>
            <SegmentName>Containers</SegmentName>
            <Dropdown icon="ellipsis horizontal" options={containerOptions} />
          </SegmentHeader>

          <Table fixed striped selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={6}>Container</Table.HeaderCell>
                <Table.HeaderCell width={1} />
                <Table.HeaderCell width={3} textAlign="center">
                  Cost Trend
                </Table.HeaderCell>
                <Table.HeaderCell width={3}>Providers</Table.HeaderCell>
                <Table.HeaderCell width={3} textAlign="right">
                  Monthly Costs
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {costContainers.map((container, index) => {
                return (
                  <Table.Row style={{ cursor: 'pointer' }} key={index} onClick={() => setSelectedContainer(container)}>
                    <Table.Cell singleLine>{container.name}</Table.Cell>
                    <Table.Cell>
                      <StyledDropdown
                        icon="ellipsis horizontal"
                        simple
                        item
                        options={itemOptions}
                        direction="left"
                        open={false}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <TinyLineChart data={container.data} width={150} height={50} dataKey="value" />
                    </Table.Cell>
                    <Table.Cell singleLine>
                      <ProviderImages providers={container.providers} />
                    </Table.Cell>

                    <Table.Cell singleLine textAlign="right">
                      {getSymbolFromCurrency(container.currency)}
                      {container.monthlyCosts}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
          <TablePaging totalResults={1} pageSize={1} />
        </Segment>
      </TableContainer>
    );
  };

  return (
    <PageLayout title="Cost Containers">
      <ComponentContainer>
        <RenderTable />
        {/* <ContainerDetail>
          <CostContainerDetail container={selectedContainer} />
        </ContainerDetail> */}
      </ComponentContainer>

      {/* <TinyLineChart /> */}
      {/* <TableFooter
        // searchValue={resources.searchValue}
        totalResults={1}
        pageSize={1}
        // isLoading={resources.isLoading}
      /> */}
    </PageLayout>
  );
};

export default CostContainersList;
