import React, { useState, useEffect } from 'react';
import PageWrapper from './pages/PageWrapper';
import { PageSection } from './pages/DefaultPageStyles';
import { Button, Form } from 'semantic-ui-react';
import { validateEmail } from 'src/utils/formValidation';
import { submitEnquiry } from 'src/services/api/apiFeedback';
import {
  DescriptionContainer,
  Segment,
  ContactCard,
  FormContainer,
  ContactCardHeader,
  Message,
} from '../components/__styles__/ExternalPageStyles';

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    comments: '',
  });
  const [isCallbackRequested, setIsCallbackRequested] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const validateForm = () => {
      if (isCallbackRequested) {
        return formData.firstName.length > 0 && formData.comments.length > 0 && validateEmail(formData.emailAddress);
      } else {
        return formData.firstName.length > 0 && formData.comments.length > 0;
      }
    };
    setIsFormValid(!!validateForm());
  }, [formData, isCallbackRequested]);

  const updateFields = (e: any) => {
    const { id, value } = e.target;
    console.log(e.target.id);
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const clearFields = () => {
    setFormData({ firstName: '', lastName: '', emailAddress: '', comments: '' });
    setIsCallbackRequested(false);
    setShowValidationMessage(false);
  };

  const ValidationMessage = () => (
    <Message color="yellow">
      <Message.Content>
        Please ensure all required fields are properly filled and email is valid if callback is requested.
      </Message.Content>
    </Message>
  );

  const SuccessMessage = () => (
    <Message color="green">
      <Message.Content>Thank you for you feedback!</Message.Content>
    </Message>
  );

  const handleOnSubmit = async (event: any) => {
    event.preventDefault();
    if (isFormValid) {
      const { firstName, lastName, emailAddress, comments } = formData;
      await submitEnquiry({
        contact: { firstName, lastName, email: emailAddress },
        message: comments,
        isCallbackRequested,
      });
      clearFields();
      setShowSuccessMessage(true);
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
            <ul>
              <p>
                <li>
                  Custom fits: Your business is unique, right? Let's chat about how we can tweak our tools to fit just
                  what you need.
                </li>
                <li>
                  Ask the experts: Got questions? Our team's got the answers to help you sort out your cloud spend
                  puzzles.
                </li>
                <li>Share your thoughts: Tell us what you love, what you don't. We love feedback!</li>
              </p>
            </ul>
            <p>
              If you're curious to learn more or just have a few questions, get in touch. We're here to help you make
              the most of your cloud budget.
            </p>
          </DescriptionContainer>
        </Segment>
        <Segment>
          <ContactCard>
            <ContactCardHeader>
              <p>Get in contact with us if you have any questions or comments</p>
            </ContactCardHeader>
            <FormContainer>
              <Form unstackable>
                <Form.Group widths={2}>
                  <Form.Input
                    label="First name"
                    placeholder="First name"
                    value={formData.firstName}
                    id="firstName"
                    required
                    onChange={updateFields}
                  />
                  <Form.Input
                    label="Last Name"
                    placeholder="Last name"
                    value={formData.lastName}
                    id="lastName"
                    onChange={updateFields}
                  />
                </Form.Group>
                <Form.Input
                  label="Email address"
                  placeholder="Email address"
                  value={formData.emailAddress}
                  id="emailAddress"
                  onChange={updateFields}
                />
                <Form.TextArea
                  label="Comments"
                  placeholder="Comments"
                  value={formData.comments}
                  id="comments"
                  required
                  onChange={updateFields}
                />
                <Form.Checkbox
                  label="Please get back in touch"
                  checked={isCallbackRequested}
                  onChange={() => setIsCallbackRequested((prev) => !prev)}
                />
                {showValidationMessage && <ValidationMessage />}
                {showSuccessMessage && <SuccessMessage />}
                <Button type="submit" onClick={handleOnSubmit}>
                  Submit
                </Button>
              </Form>
            </FormContainer>
          </ContactCard>
        </Segment>
      </PageSection>
    </PageWrapper>
  );
};

export default ContactUs;
