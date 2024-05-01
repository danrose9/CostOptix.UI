import React from 'react';
import PageWrapper from './pages/PageWrapper';
import { PageSection } from './pages/DefaultPageStyles';
import { Button, Form } from 'semantic-ui-react';

import {
  DescriptionContainer,
  Segment,
  Card,
  FormContainer,
  CardHeader,
} from '../components/__styles__/ExternalPageStyles';

export const ContactUs = () => {
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
                <Form.Input label="Name*" placeholder="Name" />
                <Form.Input label="Email address" placeholder="Email address" />
                <Form.TextArea label="Comments" placeholder="Comments" />
                <Form.Checkbox label="Please get back in touch" />
                <Button type="submit">Submit</Button>
              </Form>
            </FormContainer>
          </Card>
        </Segment>
      </PageSection>
    </PageWrapper>
  );
};

export default ContactUs;
