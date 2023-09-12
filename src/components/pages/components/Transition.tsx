import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PageLayout from '../PageLayout';

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
  transition: all 1s ease-in-out;
  cursor: pointer;
`;

const Box1 = styled(Box)`
  border: 1px solid red;
  width: 50vw;
  height: 10vh;
  opacity: 1;
  visibility: visible;
  transition: opacity 1s ease-in-out, visibility 1s ease-in-out, width 1s ease-in-out, height 1s ease-in-out;

  ${(props) =>
    props.selected &&
    css`
      width: 0;
      height: 0;
      opacity: 0;
      visibility: hidden;
      padding: 0;
    `}
`;

const Box2 = styled(Box)`
  border: 1px solid blue;
  flex-grow: 1;
  height: 80vh;
  margin: 0 10px;
  ${(props) =>
    props.selected &&
    css`
      width: 30vw;
      height: 80vh;
    `}
`;

const Box3 = styled.div`
  border: 1px solid orange;
`;

interface BoxComponentProps {
  selected: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

const Box1Component: React.FC<BoxComponentProps> = ({ selected, onClick }) => (
  <Box1 onClick={onClick} selected={selected}>
    <h3>Box1</h3>
  </Box1>
);

const Box3Component = () => {
  <Box3>
    <h3>Box3</h3>
  </Box3>;
};

const Box2Component: React.FC<BoxComponentProps> = ({ selected, onClick }) => (
  <Box2 onClick={onClick} selected={selected}>
    <h3>Box2</h3>
  </Box2>
);

const Transition = () => {
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
};

export default Transition;
