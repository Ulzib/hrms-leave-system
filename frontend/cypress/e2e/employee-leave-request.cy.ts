describe("Ажилтан чөлөөний хүсэлт үүсгэх", () => {
  beforeEach(() => {
    //huudas achaalahad duudagdh 3 get huseltiig huuramchar hariulna
    cy.intercept("GET", "**/leave/types", { fixture: "request-types" }).as(
      "getTypes",
    );

    cy.intercept("GET", "**/leave/balance", { fixture: "leave-balances" }).as(
      "getBalance",
    );

    cy.intercept("GET", "**/leave/managers", { fixture: "managers" }).as(
      "getManagers",
    );

    //employee erhtei user-r login hiisn gj uzne
    cy.fixture("user").then((user) => {
      cy.visit("/leave-request", {
        onBeforeLoad(win) {
          win.localStorage.setItem("token", "test-token");
          win.localStorage.setItem("user", JSON.stringify(user));
        },
      });
    });

    cy.wait(["@getTypes", "@getBalance", "@getManagers"]);
  });

  it("хүсэлтийн форм болон ангилалын талбар дэлгэцэд харагдана", () => {
    cy.contains("Чөлөөний хүсэлт").should("be.visible");
    cy.get("#category").should("be.visible");
  });

  it("Бүх input ийн бөглөөд илгээвэл амжилттай гэсэн modal гарна", () => {
    cy.intercept("POST", "**/api/leave**", {
      statusCode: 201,
      body: { id: 5 },
    }).as("createLeave");

    // angilal songoh
    cy.get("#category").click();
    cy.contains('[data-slot="select-item"]', /^Чөлөө$/).click();

    //turul - udruur ni songoh
    cy.get("#daily").click();

    //ognoo
    cy.get("#date").type("2027-01-01");

    //ahlah ajiltan songoh
    cy.get('input[placeholder="Ажилтан олох"]').click();
    cy.get('[data-slot="combobox-item"]').contains("Bat").click();

    //shaltgaan bichih
    cy.get("#reason").type("Шинжилгээ өгөх");

    cy.contains("button", "Хүсэлт илгээх").click();
    cy.wait("@createLeave");

    cy.contains("Амжилттай илгээгдлээ").should("exist");
  });
});
