import React, { useState } from 'react';
import PageWrapper from './pages/PageWrapper';
import { PageSection } from './pages/DefaultPageStyles';
import { Button, Form } from 'semantic-ui-react';
import { validateEmail } from 'src/utils/formValidation';
import { submitFeedback } from 'src/services/api/apiFeedback';
import {
  DescriptionContainer,
  Segment,
  Card,
  FormContainer,
  CardHeader,
  Message,
} from '../components/__styles__/ExternalPageStyles';

export const ContactUs = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [comments, setComments] = useState('');
  const [isCallbackRequested, setIsCallbackRequested] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const validateForm = validateEmail(emailAddress) && firstName.length > 0;

  const updateFields = (e: any) => {
    if (e.target.id === 'email') {
      setEmailAddress(e.target.value);
    }
    if (e.target.id === 'firstName') {
      setFirstName(e.target.value);
    }
    if (e.target.id === 'lastName') {
      setLastName(e.target.value);
    }
    if (e.target.id === 'comments') {
      setComments(e.target.value);
    }
    setIsFormValid(!!validateForm);
  };

  const clearFields = () => {
    setEmailAddress('');
    setFirstName('');
    setLastName('');
    setComments('');
    setIsCallbackRequested(false);
  };

  const ValidationMessage = () => {
    return (
      <Message color="yellow">
        <Message.Content>Please enter a valid name and email address</Message.Content>
      </Message>
    );
  };

  const handleOnSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isFormValid) {
      // const feedbackArgs: SubmitFeedbackArgs = { comments, isCallbackRequested };

      await submitFeedback({ message: comments, isCallbackRequested });
      clearFields();
    } else {
      setShowValidationMessage(true);
    }
  };

  return (
    <PageWrapper>
      <PageSection>
        <Segment>
          <DescriptionContainer>
            <p>Get ready to take control of your cloud costs with CostOptix.</p>
            <p>
              We mesh perfectly with top cloud services like Azure and Amazon Web Services, helping you snag major
              savings and unlock key insights into where your money's going.
            </p>
            <p>
              <ul>
                <li>
                  Custom fits: Your business is unique, right? Let's chat about how we can tweak our tools to fit just
                  what you need.
                </li>
                <li>
                  Ask the experts: Got questions? Our team's got the answers to help you sort out your cloud spend
                  puzzles.
                </li>
                <li>Share your thoughts: Tell us what you love, what you don't. We love feedback!</li>
              </ul>
            </p>
            <p>
              If you're curious to learn more or just have a few questions, get in touch. We're here to help you make
              the most of your cloud budget.
            </p>
          </DescriptionContainer>
        </Segment>
        <Segment>
          <Card>
            <CardHeader>
              <p>Get in contact with us if you have any questions or comments</p>
            </CardHeader>
            <FormContainer>
              <Form unstackable>
                <Form.Group widths={2}>
                  <Form.Input
                    label="First name"
                    placeholder="First name"
                    value={firstName}
                    id="firstName"
                    required
                    onChange={updateFields}
                  />
                  <Form.Input
                    label="Last Name"
                    placeholder="Last name"
                    value={lastName}
                    id="lastName"
                    onChange={updateFields}
                  />
                </Form.Group>
                <Form.Input
                  label="Email address"
                  placeholder="Email address"
                  value={emailAddress}
                  id="email"
                  onChange={updateFields}
                />
                <Form.TextArea
                  label="Comments"
                  placeholder="Comments"
                  value={comments}
                  id="comments"
                  required
                  onChange={updateFields}
                />
                <Form.Checkbox
                  label="Please get back in touch"
                  // onChange={() => setIsCallBackRequested(!isCallBackRequested)}
                />
                {showValidationMessage ? <ValidationMessage /> : null}
                <Button type="submit" onClick={handleOnSubmit}>
                  Submit
                </Button>
              </Form>
            </FormContainer>
          </Card>
        </Segment>
      </PageSection>
    </PageWrapper>
  );
};

export default ContactUs;
