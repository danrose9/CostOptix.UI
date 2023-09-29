export {};

declare global {
  namespace Cypress {
    interface Chainable {
      loginToAAD(email: string, password: string): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
}
