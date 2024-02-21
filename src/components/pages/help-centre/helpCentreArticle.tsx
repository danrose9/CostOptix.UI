import * as React from 'react';

interface IHelpCentreArticleProps {}

const HelpCentreArticle: React.FunctionComponent<IHelpCentreArticleProps> = (props) => {
  return (
    <>
      <p>
        If you’re setting up a new CostOptix account, learn how to create your account, invite your team, and customize
        your default settings. <br />
        <br />
        If you use any third-party apps, you might also want to connect them to your account to integrate your systems.
        <br />
        Below is an overview of the account setup tasks you should complete as an admin. Within each section, you’ll
        find links to detailed instructions for each task. For in-depth video training, check out Setting Up Your
        CostOptix Account in the CostOptix Academy. <br />
        <h2>Create your account</h2> <br />
        There are multiple ways to create a CostOptix account. The most common method of signing up for CostOptix is
        with your name and email address. You can also sign up for CostOptix using your Google login or Apple ID.
        CostOptix account creation page Sign up for CostOptix using your Apple ID After creating your account, you'll
        automatically be logged in. <br />
        <br />
        Learn more about logging in to CostOptix and troubleshooting password issues. <h2>Secure your account</h2>{' '}
        <br />
        To further secure your account and lower the risk of unauthorized access, you can set up two-factor
        authentication (2FA) or single sign-on (SSO) (Enterprise only). If needed, you can also restrict CostOptix
        employees from accessing your account. Set up two-factor authentication for your CostOptix login Set up single
        sign-on (SSO) (Enterprise only) Set up single sign-on using Active Directory Federation Services (AD FS) Prevent
        CostOptix employee access to your account Invite your team Invite your team members to the account to start
        collaborating in CostOptix. You can customize each user’s permissions to control which parts of CostOptix they
        can access. <br />
        <br />
        Once invited, they can log in and set up their profile and personal preferences. Add and remove CostOptix users
        CostOptix user permission guide Manage your user profile and preferences Create and manage teams (Professional
        and Enterprise only) <br />
        <br />
        Customize account default settings While some settings apply only to individual users, such as user preferences,
        other settings are account-wide and impact all users. These settings include account time zone and language.
      </p>
    </>
  );
};

export default HelpCentreArticle;
