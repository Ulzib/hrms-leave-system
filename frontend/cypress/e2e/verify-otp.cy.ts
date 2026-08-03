describe("otp баталгаажуулах хуудас", () => {
  beforeEach(() => {
    cy.visit("/verify-otp", {
      onBeforeLoad(win) {
        win.sessionStorage.setItem("otp_email", "user@gmail.com");
      },
    });
  });

  it("илгээсэн мэйл, код оруулах карт харагдана", () => {
    cy.contains("user@gmail.com руу код илгээгдсэн").should("be.visible");
    cy.get("#otp-verification").should("be.visible");
  });

  it("otp зөв бол employee-dashboard руу үсрэнэ", () => {
    cy.fixture("user").then((user) => {
      cy.intercept("POST", "**/auth/verify-otp", {
        statusCode: 200,
        body: { token: "test-token", user },
      }).as("verifyOtp");
    });

    cy.fillOtp("1234");
    cy.contains("button", "Баталгаажуулах").click();

    cy.wait("@verifyOtp");
    cy.url().should("include", "/employee-dashboard");
  });

  it("буруу otp оруулбал алдааны зурвас харагдана", () => {
    cy.intercept("POST", "**/auth/verify-otp", {
      statusCode: 400,
      body: { message: "Код буруу байна" },
    }).as("verifyOtpFail");

    cy.fillOtp("9999");
    cy.contains("button", "Баталгаажуулах").click();

    cy.wait("@verifyOtpFail");
    cy.get("[data-sonner-toast]", { timeout: 8000 }).should(
      "contain.text",
      "Код буруу байна",
    );
  });
});
