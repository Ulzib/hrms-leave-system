describe("Нэвтрэх хуудас", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("имэйл оруулах хайрцан болон Нэвтрэх товч дэлгэцэнд харагдана", () => {
    cy.get("#email").should("be.visible");
    cy.contains("button", "Нэвтрэх").should("be.visible");
  });

  it("бүртгэлтэй имэйл оруулж илгээвэл OTP хуудас руу шилждэг", () => {
    cy.intercept("POST", "**/auth/send-otp", {
      statusCode: 200,
      body: { message: "OTP илгээгдлээ" },
    }).as("sendOtp");

    cy.get("#email").type("user@gmail.com");
    cy.contains("button", "Нэвтрэх").click();

    cy.wait("@sendOtp");
    cy.url().should("include", "/verify-otp");
  });

  it("бүртгэлгүй имэйл оруулбал алдааны мессеж харагдаад login хуудсандаа үлдэнэ", () => {
    cy.intercept("POST", "**/auth/send-otp", {
      statusCode: 400,
      body: { message: "Бүртгэлгүй имэйл байна" },
    }).as("sendOtpFail");

    cy.get("#email").type("noone@gmail.com");
    cy.contains("button", "Нэвтрэх").click();

    cy.wait("@sendOtpFail");

    cy.get("[data-sonner-toast]", { timeout: 8000 }).should(
      "contain.text",
      "Бүртгэлгүй имэйл байна",
    );
    cy.url().should("include", "/login");
  });
});
