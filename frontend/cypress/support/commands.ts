/// <reference types="cypress" />

// OtpForm дээрх 4 оронтой код оруулах хайрцанд бичихийг нэг команд болгов.
// Учир нь энэ үйлдлийг олон тестэнд давхардуулж бичихээс зайлсхийе гэж бодсон.
Cypress.Commands.add("fillOtp", (code: string) => {
  cy.get("#otp-verification").type(code);
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * OTP кодын хайрцанд өгөгдсөн кодыг бичнэ
       * @example cy.fillOtp("1234")
       */
      fillOtp(code: string): Chainable<void>;
    }
  }
}

export {};
