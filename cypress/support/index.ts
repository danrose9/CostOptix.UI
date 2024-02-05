export {};

declare global {
  namespace Cypress {
    interface Chainable {
      logout(): Chainable<void>;
      purgeSession(): Chainable<void>;
      dismissWelcomeModal(): Chainable<void>;
      loginToAAD(email: string, password: string): Chainable<void>;
      login(username: string, password: string): Chainable<void>;
      deleteOrganization(organization: string): Chainable<void>;
      fillSignUpForm(username: string, organization: string): Chainable<void>;
    }
  }
}
