import React from 'react';
import { Container } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  line-height: 1.5em;
  font-size: 1.2rem;
`;

const StyledContainer = styled(Container)`
  padding-bottom: 5em;
`;

const OrderedList = styled.ol`
  list-style-type: none;
  margin-left: 2em;
  font-family: 'system-ui';
`;

export const TermsOfService = () => {
  return (
    <StyledDiv data-testid="terms-03">
      <StyledContainer>
        <OrderedList>
          <li>
            <strong>1. Introduction</strong>
            <OrderedList>
              <li>1.1 These terms and conditions shall govern your use of our website www.costoptix.com.</li>
              <li>
                1.2 By using our website, you accept these terms and conditions in full; accordingly, if you disagree
                with these terms and conditions or any part of these terms and conditions, you must not use our website.
              </li>
              <li>
                1.3 If you register with our website, submit any material to our website or use any of our website
                services, we will ask you to expressly agree to these terms and conditions.
              </li>
              <li>
                1.4 Our website uses cookies; by using our website or agreeing to these terms and conditions, you
                consent to our use of cookies in accordance with the terms of our privacy and cookies policy.
              </li>
            </OrderedList>
          </li>
          <li>
            <strong>2. Credit</strong>
            <OrderedList>
              <li>
                2.1 This document was created using a template from SEQ Legal{' '}
                <a href="http://www.seqlegal.com">(http://www.seqlegal.com)</a>. You must retain the above credit. Use
                of this document without the credit is an infringement of copyright. However, you can purchase from us
                an equivalent document that does not include the credit.
              </li>
            </OrderedList>
          </li>
          <li>
            <strong>3. Copyright notice</strong>
            <OrderedList>
              <li>3.1 Copyright (c) 2023 DDIware LTD</li>
              <li>
                3.2 Subject to the express provisions of these terms and conditions:
                <OrderedList>
                  <li>
                    (a) we, together with our licensors, own and control all the copyright and other intellectual
                    property rights in our website and the material on our website; and
                  </li>
                  <li>
                    (b) all the copyright and other intellectual property rights in our website and the material on our
                    website are reserved.
                  </li>
                </OrderedList>
              </li>
            </OrderedList>
          </li>
          <strong>4. Licence to use website</strong>
          <OrderedList>
            <li>
              4.1 You may:
              <OrderedList>
                <li>(a) view pages from our website in a web browser;</li>
                <li>(b) download pages from our website for caching in a web browser;</li>
                <li>(c) print pages from our website; and</li>
                <li>
                  (d) use our website services by means of a web browser, subject to the other provisions of these terms
                  and conditions.
                </li>
              </OrderedList>
            </li>
            <li>
              4.2 Except as expressly permitted by Section 4.1 or the other provisions of these terms and conditions,
              you must not download any material from our website or save any such material to your computer.
            </li>
            <li>
              4.3 You may only use our website for your own personal and business purposes, and you must not use our
              website for any other purposes.
            </li>
            <li>
              4.4 Except as expressly permitted by these terms and conditions, you must not edit or otherwise modify any
              material on our website.
            </li>
            <li>
              4.5 Unless you own or control the relevant rights in the material, you must not:
              <OrderedList>
                <li>(a) republish material from our website (including republication on another website);</li>
                <li>(b) sell, rent or sub-license material from our website;</li>
                <li>(c) show any material from our website in public;</li>
                <li>(d) exploit material from our website for a commercial purpose; or</li>
                <li>(e) redistribute material from our website.</li>
              </OrderedList>
            </li>
            <li>
              4.6 We reserve the right to restrict access to areas of our website, or indeed our whole website, at our
              discretion; you must not circumvent or bypass, or attempt to circumvent or bypass, any access restriction
              measures on our website.
            </li>
          </OrderedList>
          <strong>5. Acceptable use</strong>
          <OrderedList>
            <li>
              5.1 You must not:
              <OrderedList>
                <li>
                  (a) use our website in any way or take any action that causes, or may cause, damage to the website or
                  impairment of the performance, availability or accessibility of the website;
                </li>
                <li>
                  (b) use our website in any way that is unlawful, illegal, fraudulent or harmful, or in connection with
                  any unlawful, illegal, fraudulent or harmful purpose or activity;
                </li>
                <li>
                  (c) use our website to copy, store, host, transmit, send, use, publish or distribute any material
                  which consists of (or is linked to) any spyware, computer virus, Trojan horse, worm, keystroke logger,
                  rootkit or other malicious computer software;
                </li>
                <li>
                  (d) conduct any systematic or automated data collection activities (including without limitation
                  scraping, data mining, data extraction and data harvesting) on or in relation to our website without
                  our express written consent;
                </li>
                <li>
                  (e) access or otherwise interact with our website using any robot, spider or other automated means,
                  except for the purpose of search engine indexing;
                </li>
                <li>
                  (e) use data collected from our website for any direct marketing activity (including without
                  limitation email marketing, SMS marketing, telemarketing and direct mailing).
                </li>
              </OrderedList>
            </li>
          </OrderedList>
          <li>
            5.2 You must not use data collected from our website to contact individuals, companies or other persons or
            entities.
          </li>
          <li>
            5.3 You must ensure that all the information you supply to us through our website, or in relation to our
            website, is true, accurate, current, complete and non-misleading.
          </li>
          <li>
            <strong>6. Registration and accounts</strong>
            <OrderedList>
              <li>6.1 You must not allow any other person to use your credentials to access the website.</li>
              <li>
                6.2 You must notify us in writing immediately if you become aware of any unauthorised use of your access
                credentials to get access to our website.
              </li>
              <li>
                6.3 You must not use any other person's credentials to access the website, unless you have that person's
                express permission to do so.
              </li>
            </OrderedList>
          </li>
          <li>
            <strong>7. User login details</strong>
            <OrderedList>
              <li>
                7.1 Optionally, If you register for an account with our website, you will be asked to choose a user ID
                and password.
              </li>
              <li>
                7.2 Your user ID must not be liable to mislead and must comply with the content rules set out in Section
                10; you must not use your account or user ID for or in connection with the impersonation of any person.
              </li>
              <li>7.3 You must keep your password confidential.</li>
              <li>
                7.4 You must notify us in writing immediately if you become aware of any disclosure of your password.
              </li>
              <li>
                7.5 You are responsible for any activity on our website arising out of any failure to keep your password
                confidential, and may be held liable for any losses arising out of such a failure.
              </li>
            </OrderedList>
          </li>
          <li>
            <strong>8. Cancellation and suspension of account</strong>
            <OrderedList>
              <li>
                8.1 We may:{' '}
                <OrderedList>
                  <li>(a) suspend your account;</li>
                  <li>(b) cancel your account; and/or</li>
                  <li>
                    (c) edit your account details, at any time in our sole discretion without notice or explanation.
                  </li>
                </OrderedList>
              </li>
              <li>8.2 You may cancel your account at any time via email request at info@ddiware.com</li>
            </OrderedList>
          </li>
          <li>
            <strong>9. Limited warranties</strong>
            <OrderedList>
              <li>
                9.1 We do not warrant or represent:
                <OrderedList>
                  <li>(a) the completeness or accuracy of the information published on our website;</li>
                  <li>(b) that the material on the website is up to date; or</li>
                  <li>(c) that the website or any service on the website will remain available.</li>
                </OrderedList>
              </li>
              <li>
                9.2 We reserve the right to discontinue or alter any or all of our website services, and to stop
                publishing our website, at any time in our sole discretion without notice or explanation; and save to
                the extent expressly provided otherwise in these terms and conditions, you will not be entitled to any
                compensation or other payment upon the discontinuance or alteration of any website services, or if we
                stop publishing the website.
              </li>
              <li>
                9.3 To the maximum extent permitted by applicable law and subject to Section 10.1, we exclude all
                representations and warranties relating to the subject matter of these terms and conditions, our website
                and the use of our
              </li>
              website.
            </OrderedList>
          </li>
          <li>
            <strong>10. Limitations and exclusions of liability</strong>
            <OrderedList>
              <li>
                10.1 Nothing in these terms and conditions will:{' '}
                <OrderedList>
                  <li>(a) limit or exclude any liability for death or personal injury resulting from negligence;</li>
                  <li>(b) limit or exclude any liability for fraud or fraudulent misrepresentation;</li>
                  <li>(c) limit any liabilities in any way that is not permitted under applicable law; or</li>
                  <li>(d) exclude any liabilities that may not be excluded under applicable law.</li>
                </OrderedList>
              </li>
              <li>
                10.2 The limitations and exclusions of liability set out in this Section and elsewhere in these terms
                and conditions:
                <OrderedList>
                  <li>(a) are subject to Section 10.1; and</li>
                  <li>
                    (b) govern all liabilities arising under these terms and conditions or relating to the subject
                    matter of these terms and conditions, including liabilities arising in contract, in tort (including
                    negligence) and for breach of statutory duty, except to the extent expressly provided otherwise in
                    these terms and conditions.
                  </li>
                </OrderedList>
              </li>
              <li>
                10.3 To the extent that our website and the information and services on our website are provided free of
                charge, we will not be liable for any loss or damage of any nature.
              </li>
              <li>
                10.4 We will not be liable to you in respect of any losses arising out of any event or events beyond our
                reasonable control.
              </li>
              <li>
                10.5 We will not be liable to you in respect of any business losses, including (without limitation) loss
                of or damage to profits, income, revenue, use, production, anticipated savings, business, contracts,
                commercial opportunities or goodwill.
              </li>
              <li>
                10.6 We will not be liable to you in respect of any loss or corruption of any data, database or
                software.
              </li>
              <li>
                10.7 We will not be liable to you in respect of any special, indirect or consequential loss or damage.
              </li>
              <li>
                10.8 You accept that we have an interest in limiting the personal liability of our officers and
                employees and, having regard to that interest, you acknowledge that we are a limited liability entity;
                you agree that you will not bring any claim personally against our officers or employees in respect of
                any losses you suffer in connection with the website or these terms and conditions (this will not, of
                course, limit or exclude the liability of the limited liability entity itself for the acts and omissions
                of our officers and employees).
              </li>
            </OrderedList>
          </li>
          <li>
            <strong>11. Breaches of these terms and conditions</strong>
            <OrderedList>
              <li>
                11.1 Without prejudice to our other rights under these terms and conditions, if you breach these terms
                and conditions in any way, or if we reasonably suspect that you have breached these terms and conditions
                in any way, we may:
                <OrderedList>
                  <li>(a) send you one or more formal warnings;</li>
                  <li>(b) temporarily suspend your access to our website;</li>
                  <li>(c) permanently prohibit you from accessing our website;</li>
                  <li>(d) block computers using your IP address from accessing our website;</li>
                  <li>(e) commence legal action against you, whether for breach of contract or otherwise; and/or</li>
                  <li>(f) suspend or delete your account on our website.</li>
                </OrderedList>
              </li>
              <li>
                11.2 Where we suspend or prohibit or block your access to our website or a part of our website, you must
                not take any action to circumvent such suspension or prohibition or blocking (including without
                limitation creating and/or using a different account).
              </li>
            </OrderedList>
          </li>
          <li>
            <strong>12. Variation</strong>
            <OrderedList>
              <li>12.1 We may revise these terms and conditions from time to time.</li>
              <li>
                12.2 The revised terms and conditions shall apply to the use of our website from the date of publication
                of the revised terms and conditions on the website, and you hereby waive any right you may otherwise
                have to be notified of, or to consent to, revisions of these terms and conditions
              </li>
              <li>
                12.3 If you have given your express agreement to these terms and conditions, we will ask for your
                express agreement to any revision of these terms and conditions; and if you do not give your express
                agreement to the revised terms and conditions within such period as we may specify, we will disable or
                delete your account on the website, and you must stop using the website.
              </li>
            </OrderedList>
          </li>
          <li>
            <strong>13. Assignment</strong>
            <OrderedList>
              <li>
                13.1 You hereby agree that we may assign, transfer, sub-contract or otherwise deal with our rights
                and/or obligations under these terms and conditions.
              </li>
              <li>
                13.2 You may not without our prior written consent assign, transfer, sub-contract or otherwise deal with
                any of your rights and/or obligations under these terms and conditions.
              </li>
            </OrderedList>
          </li>
          <li>
            <strong>14. Severability</strong>
            <OrderedList>
              <li>
                14.1 If a provision of these terms and conditions is determined by any court or other competent
                authority to be unlawful and/or unenforceable, the other provisions will continue in effect.
              </li>
              <li>
                14.2 If any unlawful and/or unenforceable provision of these terms and conditions would be lawful or
                enforceable if part of it were deleted, that part will be deemed to be deleted, and the rest of the
                provision will continue in effect.
              </li>
            </OrderedList>
          </li>
          <li>
            <strong>15. Third party rights</strong>
            <OrderedList>
              <li>
                15.1 A contract under these terms and conditions is for our benefit and your benefit, and is not
                intended to benefit or be enforceable by any third party.
              </li>
              <li>
                15.2 The exercise of the parties' rights under a contract under these terms and conditions is not
                subject to the consent of any third party.
              </li>
            </OrderedList>
          </li>
          <li>
            <strong>16. Entire agreement</strong>
            <OrderedList>
              <li>
                16.1 Subject to Section 10.1, these terms and conditions, together with our privacy and cookies policy,
                shall constitute the entire agreement between you and us in relation to your use of our website and
                shall supersede all previous agreements between you and us in relation to your use of our website.
              </li>
            </OrderedList>
          </li>
          <li>
            <strong>17. Law and jurisdiction</strong>
            <OrderedList>
              <li>17.1 These terms and conditions shall be governed by and construed in accordance with UK law.</li>
              <li>
                17.2 Any disputes relating to these terms and conditions shall be subject to the jurisdiction of the
                courts of the United Kingdom.
              </li>
            </OrderedList>
          </li>
          <li>
            <strong>18. Statutory and regulatory disclosures</strong>
            <OrderedList>
              <li>18.1 For contact information send an email to info@ddiware.com</li>
            </OrderedList>
          </li>
        </OrderedList>
      </StyledContainer>
    </StyledDiv>
  );
};

export default TermsOfService;
