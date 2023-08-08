import React from 'react';
import { Segment, Container } from 'semantic-ui-react';
import styled from 'styled-components';

export const StyledResult = styled.div`
  display: block;
  font-family: monospace;
  margin: 1em 0;
  height: auto;
  overflow-wrap: break-word;
`;

export const StyledFilterOutput = styled(Container)`
  margin: 1em;
`;

interface IFilterOutputProps {
  value: string;
}

const FilterOutput: React.FC<IFilterOutputProps> = (props) => {
  const { value } = props;
  const jsonString = JSON.stringify(value, null);
  return (
    <StyledFilterOutput columns={1} fluid>
      <Segment secondary>
        <StyledResult>Query: {jsonString}</StyledResult>
      </Segment>
    </StyledFilterOutput>
  );
};

export default FilterOutput;
