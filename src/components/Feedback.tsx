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
import { submitFeedback } from '../services/api/submitFeedback';

export const FEEDBACK_PLACEHOLDER = 'Tell us more about your experience';
export const FEEDBACK_LABEL = 'Feedback';
const DEFAULT_RATING = 3;
const DEFAULT_MAX_RATING = 5;
const ANIMATION = { animation: 'fade up', duration: 1000 };

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

export const Feedback = () => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(DEFAULT_RATING);
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await submitFeedback({ rating, feedbackText });
    setFeedbackText('');
    setOpen(false);
  };

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const FeedbackDropdownItem = () => {
    return (
      <span>
        <Icon name="star" />
        <FeedbackButton onClick={handleClick}>Feedback</FeedbackButton>
      </span>
    );
  };

  const handleRatingChange = (e: React.MouseEvent, data: any) => {
    setRating(data.rating);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedbackText(e.target.value);
  };

  return (
    <div>
      <FeedbackDropdownItem />
      <TransitionablePortal onClose={handleClose} open={open} transition={ANIMATION}>
        <Segment>
          <Card>
            <CardContent>
              <Rating
                icon="star"
                defaultRating={DEFAULT_RATING}
                maxRating={DEFAULT_MAX_RATING}
                size="large"
                onRate={handleRatingChange}
                data-testid="rating-selector"
              />
              <Form>
                <Form.Field
                  control={TextArea}
                  label={FEEDBACK_LABEL}
                  placeholder={FEEDBACK_PLACEHOLDER}
                  onChange={handleTextChange}
                  value={feedbackText}
                />

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
