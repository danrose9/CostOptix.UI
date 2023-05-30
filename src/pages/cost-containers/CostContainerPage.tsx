import React, { useState } from 'react';
import PageLayout from '../PageLayout';
import styled from 'styled-components';
import { Table, Segment, Dropdown } from 'semantic-ui-react';
import CostContainerTable from './CostContainerTable';
import CostContainerDetail from './CostContainerDetail';

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
];

const ComponentContainer = styled.div`
  display: flex;
  padding: 0.5em 0 1em;
`;

const CostContainersList = styled.div`
  flex-basis: 70%;
`;

const ContainerDetail = styled.div`
  flex-basis: 30%;
`;

interface ICostContainerPage {
  // Define the prop types here
}

const CostContainerPage: React.FC<ICostContainerPage> = (props) => {
  const [selectedContainer, setSelectedContainer] = useState<any>(costContainers[0]);

  const selectContainerDetail = (container: any) => {
    setSelectedContainer(container);
  };

  return (
    <PageLayout title="Cost Containers">
      <ComponentContainer>
        <CostContainersList>
          <CostContainerTable containers={costContainers} selectContainerDetail={selectContainerDetail} />
        </CostContainersList>
        <ContainerDetail>
          <CostContainerDetail container={selectedContainer} />
        </ContainerDetail>
      </ComponentContainer>
    </PageLayout>
  );
};

export default CostContainerPage;
