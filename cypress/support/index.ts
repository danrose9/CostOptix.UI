export {};

declare global {
  namespace Cypress {
    interface Chainable {
      loginToAAD(email: string, password: string): Chainable<void>;
      logout(): Chainable<void>;
      login(username: string, password: string): Chainable<void>;
      deleteOrganization(organization: string): Chainable<void>;
      purgeSession(): Chainable<void>;
      fillSignUpForm(username: string, organization: string): Chainable<void>;
    }
  }
}
