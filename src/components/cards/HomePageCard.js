import React from 'react';
import { Card } from 'semantic-ui-react';

const HomePageCard = (props) => {
  return (
    <Card
      raised
      fluid
      image={props.image}
      description={props.title}
      color="orange"
      href={props.href}
    />
  );
};

export default HomePageCard;
