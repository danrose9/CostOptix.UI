import React, { useState } from 'react';
import {
  Rating,
  TextArea,
  CardContent,
  Card,
  Icon as SemanticIcon,
  Form,
  Button,
  Segment as SemanticSegmant,
  TransitionablePortal,
} from 'semantic-ui-react';
import styled from 'styled-components';

const FEEDBACK_PLACEHOLDER = 'Tell us more about your experience';
const FEEDBACK_LABEL = 'Feedback';
const DEFAULT_RATING = 3;
const DEFAULT_MAX_RATING = 5;
const ANIMATION = { animation: 'fade up', duration: 1000 };

interface FeedbackProps {
  openFeedback?: boolean;
}

const FeedbackButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Segment = styled(SemanticSegmant)`
  left: 45%;
  position: fixed !important;
  top: 10%;
  z-index: 1000;
  border: 0.1em solid green !important;
`;

const Icon = styled(SemanticIcon)`
  color: gold;
`;

export const Feedback: React.FC<FeedbackProps> = ({ openFeedback }) => {
  const [open, setOpen] = useState(openFeedback);
  const handleSubmit = () => setOpen(false);

  const FeedbackDropdownItem = () => {
    return (
      <span>
        <Icon name="star" />
        <FeedbackButton onClick={() => setOpen(true)}>Feedback</FeedbackButton>
      </span>
    );
  };

  return (
    <div>
      <TransitionablePortal
        onClose={() => setOpen(false)}
        open={open}
        transition={ANIMATION}
        trigger={<FeedbackDropdownItem />}
      >
        <Segment>
          <Card>
            <CardContent>
              <Rating icon="star" defaultRating={DEFAULT_RATING} maxRating={DEFAULT_MAX_RATING} size="large" />
              <Form>
                <Form.Field control={TextArea} label={FEEDBACK_LABEL} placeholder={FEEDBACK_PLACEHOLDER} />

                <Button type="submit" onClick={handleSubmit} positive>
                  Submit
                </Button>
              </Form>
            </CardContent>
          </Card>
        </Segment>
      </TransitionablePortal>
    </div>
  );
};
