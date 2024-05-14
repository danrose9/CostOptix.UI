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
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 2em;
    margin: 1em 0 1em 2em;
    text-align: center;
  }
`;

const CardContent = styled.div`
  padding: 1.5em;
`;

const ImageContainer = styled.div`
  // flex: none; // Ensures that the ImageContainer doesn't grow or shrink
  // padding-right: 1em; // Optional: Adds some spacing between the image and the text
`;

const SubscriptionTypeContainer = styled.div`
  flex: 1; // Takes up the rest of the space in PricingCardHeader
  display: flex;
  justify-content: center; // Centers the content horizontally
  align-items: center; // Centers the content vertically
`;

const Image = styled.img`
  width: 10vh;
  height: auto;
  max-width: 100%;
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
  strapline?: string;
  secondaryStrapline?: string;
  price?: string;
  features?: string[];
  children?: React.ReactNode;
  image?: string;
}

export function PricingCard(props: IPricingCardProps) {
  const { subscriptionType, image, features, strapline, secondaryStrapline } = props;
  return (
    <Card>
      <PricingCardHeader>
        <ImageContainer>
          <Image src={image} />
        </ImageContainer>
        <SubscriptionTypeContainer>
          <p>{subscriptionType}</p>
        </SubscriptionTypeContainer>
        <div style={{ width: '8em' }} />
      </PricingCardHeader>
      <CardContent>
        <p>{strapline}</p>
        <p>{secondaryStrapline}</p>
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
