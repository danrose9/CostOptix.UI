import React from 'react';
import { Card as SemanticCard, List } from 'semantic-ui-react';
import styled from 'styled-components';
import { COLORS, FONT } from 'src/app/constants';

const Card = styled(SemanticCard)`
  margin: 1em !important;
  width: 30em !important;
  border-radius: 25px !important;
  box-shadow: 0 0 10px 0 ${COLORS.SECONDARY} !important;
  height: 70vh;
  overflow: hidden;
  p,
  li {
    font-size: 1.2em;
    color: ${FONT.SECONDARY_COLOR} !important;
  }
  li {
    padding: 0.5em !important;
  }
`;

const PricingCardHeader = styled.div`
  background-color: #d7f6f1;
  height: 10vh;
  align-content: center;
  display: flex;

  p {
    font-size: 2em;
    margin: auto 0 1em 2em;
    text-align: center;
  }
`;

const CardContent = styled.div`
  padding: 1.5em;
`;

const Image = styled.img`
  width: 8em;
`;

const ChildrenContainer = styled.div`
  button {
    position: absolute;
    bottom: 2em;
    width: 90%;
  }
`;

interface IPricingCardProps {
  subscriptionType?: string;
  subscriptionStrapline?: string;
  price?: string;
  features?: string[];
  children?: React.ReactNode;
  image?: string;
}

export function PricingCard(props: IPricingCardProps) {
  const { subscriptionType, image, features, subscriptionStrapline } = props;
  return (
    <Card>
      <PricingCardHeader>
        <Image src={image} />
        <p>{subscriptionType}</p>
      </PricingCardHeader>
      <CardContent>
        <p>{subscriptionStrapline}</p>

        <div>
          <List as="ul">
            {features?.map((feature, index) => (
              <List.Item key={index} as="li">
                {feature}
              </List.Item>
            ))}
          </List>
        </div>
        <ChildrenContainer>{props.children}</ChildrenContainer>
      </CardContent>
    </Card>
  );
}
