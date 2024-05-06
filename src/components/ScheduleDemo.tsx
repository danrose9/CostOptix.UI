import React, { useState } from 'react';
import PageWrapper from './pages/PageWrapper';
import { PageSection } from './pages/DefaultPageStyles';
import { Button, Form, Message } from 'semantic-ui-react';
import { submitDemoRequest, ContactInfo } from 'src/services/api/apiFeedback';
import { validateEmail } from 'src/utils/formValidation';
import {
  DescriptionContainer,
  Segment,
  Card,
  FormContainer,
  CardHeader,
} from '../components/__styles__/ExternalPageStyles';

export const ScheduleDemo = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
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
    if (e.target.id === 'company') {
      setCompany(e.target.value);
    }
    if (e.target.id === 'phoneNumber') {
      setPhoneNumber(e.target.value);
    }
    setIsFormValid(!!validateForm);
  };

  const clearFields = () => {
    setEmailAddress('');
    setFirstName('');
    setLastName('');
    setCompany('');
    setPhoneNumber('');
    setShowValidationMessage(false);
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
      const contactInfo: ContactInfo = { firstName, lastName, email: emailAddress, phone: phoneNumber, company };
      await submitDemoRequest({ contact: contactInfo });
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
            <p>Discover the power of cost visualization across each of your cloud providers with CostOptix. </p>
            <p>
              Our platform seamlessly integrates with Azure and Amazon Web Services to bring you huge cost saving
              benifits and impressive insights into your cloud spend.
            </p>
            <p>Why take a Demo?</p>
            <ul>
              <p>
                <li>
                  Single pane of glass: CostOptix provides a unified view of your cloud spend across multiple providers.
                </li>
                <li>
                  Track your spend: Real-time cost tracking and forecasting help you stay on top of your cloud spend.
                </li>
                <li>
                  Gain insights: CostOptix provides detailed insights into your spend across tagged resources, helping
                  you make informed decisions.
                </li>
              </p>
            </ul>
            <p>Ready to transform your cloud spending?</p>
          </DescriptionContainer>
        </Segment>
        <Segment>
          <Card>
            <CardHeader>
              <p>Schedule a demo today and see CostOptix in action!</p>
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
                    required
                    onChange={updateFields}
                  />
                </Form.Group>
                <Form.Input
                  label="Email address"
                  placeholder="Email address"
                  value={emailAddress}
                  id="email"
                  required
                  onChange={updateFields}
                />
                <Form.Input
                  label="Company"
                  placeholder="Company"
                  value={company}
                  id="company"
                  onChange={updateFields}
                />
                <Form.Input
                  label="Phone number"
                  placeholder="Phone number"
                  value={phoneNumber}
                  id="phoneNumber"
                  onChange={updateFields}
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

export default ScheduleDemo;
