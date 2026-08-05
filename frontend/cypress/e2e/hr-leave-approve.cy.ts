describe("HR - хүсэлт зөвшөөрөх, татгалзах", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/leave/all-requests", {
      fixture: "leave-requests",
    }).as("getReqs");

    //hr erhtei user login hiisen gj uzne
    cy.fixture("hr-user").then((hrUser) => {
      cy.visit("/leaves", {
        onBeforeLoad(win) {
          win.localStorage.setItem("token", "test-token");
          win.localStorage.setItem("user", JSON.stringify(hrUser));
        },
      });
    });

    cy.wait("@getReqs");
  });

  it("хүлээгдэж буй хүсэлтийн жагсаалт дэлгэцэнд харагдана", () => {
    cy.contains("button", "Bat").should("be.visible");
  });

  it("хүсэлтийг сонгоод зөвшөөрвөл амжилттай болно", () => {
    cy.intercept("PATCH", "**/leave/*/status", { statusCode: 200 }).as(
      "approveReq",
    );
    //jagsaaltaas huseltiig songoj, baruun talin panel neegdene
    cy.contains("button", "Bat").click();
    cy.contains("Чөлөө авах шалтгаан").should("be.visible");

    //panel deerh button
    cy.contains("button", "Зөвшөөрөх").click();

    //batalgaajuulah modal dtr dahin Zuvshuuruh button darna
    cy.get('[role="dialog"]').within(() => {
      cy.contains("button", "Зөвшөөрөх").click();
    });
    cy.wait("@approveReq");

    cy.contains("Хүсэлтээ сонгоно уу").should("exist");
  });

  it("хүсэлтийг сонгоод шалтгаан бичиж татгалзвал амжилттай болно", () => {
    cy.intercept("PATCH", "**/leave/*/status", { statusCode: 200 }).as(
      "rejectReq",
    );

    cy.contains("button", "Bat").click();
    cy.contains("button", "Татгалзах").click();

    cy.get("[role=dialog]").within(() => {
      cy.get("textarea").type("Ачаалал ихтэй тул татгалзлаа");
      cy.contains("button", "Илгээх").click();
    });

    cy.wait("@rejectReq");
    cy.contains("Хүсэлтээ сонгоно уу").should("exist");
  });
});
