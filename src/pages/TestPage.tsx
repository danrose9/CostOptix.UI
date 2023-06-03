import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PageLayout from '../pages/PageLayout';

interface BoxProps {
  selected?: boolean;
  onClick: () => void;
}

// ComponentContainer should fit the size of the screen
const ComponentContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  padding: 0.5em 0 1em;
  border: 1px solid black;
`;

const Box = styled.div<BoxProps>`
  width: 30vw;
  height: 10vh;
  margin: 10px;
  transition: all 0.3s ease-in-out;

  ${(props) =>
    props.selected &&
    css`
      width: 20vw;
      height: 70vh;
    `}
`;

const Box1 = styled(Box)`
  border: 1px solid red;
`;

const Box2 = styled(Box)`
  border: 1px solid blue;
`;

interface BoxComponentProps {
  selected: boolean;
  onClick: () => void;
}

const Box1Component: React.FC<BoxComponentProps> = ({ selected, onClick }) => (
  <Box1 onClick={onClick} selected={selected} />
);

const Box2Component: React.FC<BoxComponentProps> = ({ selected, onClick }) => (
  <Box2 onClick={onClick} selected={selected} />
);

function TestPage() {
  const [selectedBox, setSelectedBox] = useState<string | null>(null);

  const handleClick = (box: string) => {
    setSelectedBox(box);
  };

  return (
    <PageLayout title="Cost Containers">
      <ComponentContainer>
        <Box1Component onClick={() => handleClick('box1')} selected={selectedBox === 'box1'} />
        <Box2Component onClick={() => handleClick('box2')} selected={selectedBox === 'box2'} />
      </ComponentContainer>
    </PageLayout>
  );
}

export default TestPage;
