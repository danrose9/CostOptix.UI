import React from 'react';
import { OrderedList } from '../../components/pages/LegalNotice';

export const PrivacyPolicy = () => {
  return (
    <OrderedList>
      <li>
        <strong>1. Introduction</strong>
        <OrderedList>
          <li>
            Welcome to DDIWare ("we," "our," or "us"). At DDIWare, we are committed to protecting your privacy and
            handling your personal data with care. This Privacy Policy outlines how we collect, use, disclose, and
            protect your personal information when you use our SaaS platform and related services.
          </li>
        </OrderedList>
      </li>
      <li>
        <strong>2. Information We Collect</strong>
        <OrderedList>
          <li>2.1. Personal Information: We may collect the following personal information from you:</li>
          <OrderedList>
            <li>Name</li>
            <li>Email address</li>
            <li>Contact information User credentials (e.g., username and password)</li>
            <li>Billing and payment information</li>
            <li>Any other information you voluntarily provide to us.</li>
          </OrderedList>
          <li>
            2.2. Usage Data: We may also collect non-personal information about your use of our SaaS platform, such as
            IP address, browser type, operating system, and usage patterns.
          </li>
        </OrderedList>
      </li>
      <li>
        <strong>3. How We Use Your Information</strong>
        <OrderedList>
          <li>3.1 We use your personal information for the following purposes:</li>

          <OrderedList>
            <li>To provide and maintain our SaaS services.</li>
            <li>
              To communicate with you, including sending important updates, newsletters, and marketing materials (if
              you've consented).
            </li>
            <li>To process payments and provide customer support.</li>
            <li>To improve our services and develop new features.</li>
            <li>To comply with legal obligations.</li>
          </OrderedList>
        </OrderedList>
      </li>
      <strong>4. Data Sharing and Disclosure</strong>
      <OrderedList>
        <li>
          4.1 We may share your personal information with:
          <OrderedList>
            <li>Third-party service providers to assist us in delivering our services.</li>
            <li>Business partners when necessary to provide joint services.</li>
            <li>Legal authorities when required by law or to protect our rights, privacy, safety, or property.</li>
          </OrderedList>
        </li>
      </OrderedList>
      <strong>5. Your Rights</strong>
      <OrderedList>
        <li>
          5.1 You have the following rights regarding your personal information:
          <OrderedList>
            <li>5.1.1 Access: You can request access to your personal data</li>
            <li>5.1.2 Correction: You can request that we correct any inaccuracies in your personal data.</li>
            <li>5.1.3 Deletion: You can request the deletion of your personal data.</li>
            <li>5.1.4 Objection: You can object to the processing of your personal data.</li>
            <li>
              5.1.5 Portability: You can request a copy of your personal data in a structured, machine-readable format.
            </li>
            To exercise these rights, please contact us at gdpr@ddiware.com.
          </OrderedList>
        </li>
      </OrderedList>

      <li>
        <strong>6. Security</strong>
        <OrderedList>
          <li>
            6.1 We take reasonable steps to protect your personal information from unauthorized access, disclosure, or
            alteration. However, no method of transmission over the internet or electronic storage is 100% secure, and
            we cannot guarantee absolute security.
          </li>
        </OrderedList>
      </li>
      <li>
        <strong>7. Changes to this Privacy Policy</strong>
        <OrderedList>
          <li>
            7.1 We may update this Privacy Policy from time to time to reflect changes in our practices or for legal
            reasons. We will post the updated Privacy Policy on our website with the date of the last revision.
          </li>
        </OrderedList>
      </li>
      <li>
        <strong>8. Contact Us</strong>
        <OrderedList>
          <li>
            8.1 If you have any questions or concerns about this Privacy Policy or our data practices, please contact us
            at gdpr@ddiware.com.
          </li>
        </OrderedList>
      </li>
    </OrderedList>
  );
};

export default PrivacyPolicy;
