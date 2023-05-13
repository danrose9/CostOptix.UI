import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table, Header, Divider, Segment, Dropdown } from 'semantic-ui-react';
import { PageHeader } from '../../components/PageHeader';
import { ProviderImage } from '../../components/ProviderImage';
import { useSelector } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';
import SearchStandard from '../../components/SearchStandard';
import { SegmentName, SegmentHeader, TableContainer } from '../__styles__/DefaultPageStyles';
import { TablePaging } from '../../components/tables/TablePaging';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../app/appRoutes';
import { RESET_ISAVAILABLE } from '../../services/redux/reducers/resourceSlice';
import ActionButton, { ActionButtons } from '../../components/buttons/ActionButton';
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

const costContainers = [
  {
    name: 'Software Project 1',
    description:
      'The software project currently in development is a cloud-based project management tool designed to streamline team collaboration and increase productivity by providing real-time updates and task management capabilities.',
    created: '23/05/2022',
    createdBy: 'Doug Davis',
    owner: 'Doug Davis',
    resourceCount: 24,
    monthlyCosts: '8,726.00',
    currency: 'USD',
    providers: ['AWS', 'Azure'],
    data: [{ pv: 4000 }, { pv: 3000 }, { pv: 2000 }, { pv: 2780 }, { pv: 1890 }, { pv: 2380 }, { pv: 3980 }],
  },
  {
    name: 'Software Project with a really really long name that no one is aware of',
    description:
      'Our team is developing a cutting-edge mobile application that revolutionizes how users manage their personal finances, with advanced features for budgeting, expense tracking, and investment analysis.',
    created: '03/02/2021',
    createdBy: 'Dan Rose',
    owner: 'Doug Davis',
    resourceCount: 3,
    monthlyCosts: '783.00',
    currency: 'USD',
    providers: ['AWS'],
    data: [{ pv: 1290 }, { pv: 1120 }, { pv: 2910 }, { pv: 2370 }, { pv: 2630 }, { pv: 2530 }, { pv: 2180 }],
  },
  {
    name: 'Backup for IT',
    description:
      'Our software development project focuses on creating an AI-powered chatbot for customer support, capable of understanding natural language queries, providing instant responses, and escalating complex issues to human agents when necessary, improving overall service efficiency and customer engagement.',
    created: '29/11/2021',
    createdBy: 'Doug Davis',
    owner: 'Joe Public',
    resourceCount: 17,
    monthlyCosts: '95, 263.00',
    currency: 'EUR',
    providers: ['AWS'],
    data: [{ pv: 14000 }, { pv: 16780 }, { pv: 19820 }, { pv: 23090 }, { pv: 27890 }, { pv: 47890 }, { pv: 65290 }],
  },
  {
    name: 'SQL DB for Finance',
    description:
      'We are working on a web-based e-commerce platform that provides seamless integration with popular payment gateways, efficient inventory management, and personalized shopping experiences to enhance customer satisfaction and drive sales',
    created: '13/01/2023',
    createdBy: 'Ian Byrne',
    owner: 'Ian Byrne',
    resourceCount: 5,
    monthlyCosts: '23,543.00',
    currency: 'USD',
    providers: ['AWS', 'Azure'],
    data: [{ pv: 47000 }, { pv: 38500 }, { pv: 32090 }, { pv: 25780 }, { pv: 21890 }, { pv: 23880 }, { pv: 13980 }],
  },
];

const tinychart = {
  width: 150,
  height: 30,
};

const DisplayProviders = (providers: any) => {
  return (
    <Fragment>
      {providers.map((provider: string, index: any) => {
        return <ProviderImage provider={provider} size="big" floated="left" />;
      })}
    </Fragment>
  );
};

const containerOptions = [
  { key: 1, text: 'Add New', value: 1, icon: 'add' },
  { key: 2, text: 'Hide', value: 2, icon: 'add' },
];
const itemOptions = [
  { key: 1, text: 'Edit', value: 1, icon: 'add' },
  { key: 2, text: 'Set Budgets', value: 2, icon: 'add' },
];

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
                <Table.HeaderCell width={4}>Container</Table.HeaderCell>
                <Table.HeaderCell width={1} />
                <Table.HeaderCell width={3}>Cost Trend</Table.HeaderCell>
                <Table.HeaderCell width={3}>Providers</Table.HeaderCell>
                <Table.HeaderCell width={4} textAlign="right">
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
                      <Dropdown
                        icon="ellipsis horizontal"
                        simple
                        item
                        // style={{ zIndex: 300 }}
                        options={itemOptions}
                        direction="left"
                        open={false}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <TinyLineChart data={container.data} config={tinychart} />
                    </Table.Cell>
                    <Table.Cell singleLine>{/* <DisplayProviders /> */}</Table.Cell>

                    <Table.Cell singleLine textAlign="right">
                      {container.currency}
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
        <ContainerDetail>
          <CostContainerDetail container={selectedContainer} />
        </ContainerDetail>
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
