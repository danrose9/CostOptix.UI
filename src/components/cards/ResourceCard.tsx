import React from 'react';
import styled from 'styled-components';
import { Card, Icon, SemanticICONS, Statistic } from 'semantic-ui-react';
import { FONT } from 'src/app/constants';
import TinyLineChart from '../charts/TinyLineChart';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const StyledCard = styled(Card)`
  * {
    color: ${FONT.PRIMARY_COLOR} !important;
  }
  border-radius: 1em !important;
  display: flex !important;
  flex-direction: row !important;
  background-color: #e0eafd !important;
`;

const CardContent = styled(Card.Content)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // padding: 0.1em;
  height: 12em;
`;
const CardHeader = styled(Card.Header)`
  padding: 0 0 0.5em;
  font-family: inherit !important;
  font-weight: 500 !important;
  font-size: 2.1em !important;
`;

const StatisticValue = styled(Statistic.Value)`
  color: ${FONT.STAT} !important;
  font-size: 2.5em;
  padding: 0.7em 0 0.7em !important;
`;

const CardDescription = styled(Card.Content)`
  // font-size: 1.5em !important;
`;

const StyledIcon = styled(Icon)`
  font-size: 3em !important;
  color: #3a3a3a !important;
`;

interface IResourceCard {
  title: string;
  content: string;
  description: string;
  onClick?: () => void;
  icon: string;
}

const ResourceCard: React.FC<IResourceCard> = ({ title, description, content, icon, onClick }) => {
  return (
    <StyledCard raised onClick={onClick}>
      <CardContent>
        <CardHeader>{title}</CardHeader>
        <StatisticValue>{content}</StatisticValue>
        <CardDescription extra>{description}</CardDescription>
      </CardContent>
      <CardContent>
        <StyledIcon name={icon as SemanticICONS} />

        {/* <TinyLineChart width={200} height={150} data={data} dataKey={'uv'} /> */}
      </CardContent>
    </StyledCard>
  );
};

export default ResourceCard;
