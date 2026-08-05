describe("Admin - ажилчдын жагсаалт", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/admin/employee*", {
      fixture: "employees",
    }).as("getEmployees");

    //admin erhtei user login hiisn gj uzne
    cy.fixture("admin-user").then((adminUser) => {
      cy.visit("/admin-dashboard", {
        onBeforeLoad(win) {
          win.localStorage.setItem("token", "test-token");
          win.localStorage.setItem("user", JSON.stringify(adminUser));
        },
      });
    });
    cy.wait("@getEmployees");
  });

  it("ажилчдын жагсаалт хүснэгтэд харагдана", () => {
    cy.contains("Нийт ажилчид").should("be.visible");
    cy.contains("td", "Bat").should("be.visible");
  });

  it("шинэ ажилтан бүртгэх товч дарвал форм модал нээгдэнэ", () => {
    cy.contains("button", "Шинэ ажилтан бүртгэх").click();
    cy.contains(
      "Дараах формыг бөглөж шинэ ажилтны мэдээллийг оруулна уу.",
    ).should("be.visible");
    cy.get("#username").should("be.visible");
  });

  it("формыг бөглөж илгээвэл шинэ ажилтан амжилттай нэмэгдэнэ", () => {
    cy.intercept("POST", "**/admin/employees", {
      statusCode: 201,
      body: { id: 9 },
    }).as("createEmployee");

    cy.contains("button", "Шинэ ажилтан бүртгэх").click();

    cy.get("#username").type("Saraa");
    cy.get("#position").type("Дизайнер");
    cy.get("#email").type("saraa@gmail.com");

    //ajild orsn ognoog songono
    cy.contains("button", "Огноо сонгох").click();
    cy.contains("button", /^10$/).click();

    //erhiig songono
    cy.contains("Эрхийг тохируулах")
      .parent()
      .find('[data-slot="select-trigger"]')
      .click();
    cy.get('[data-slot="select-item"]').contains("Ажилтан болгох").click();

    cy.contains("button", "Нэмэх").click();
    cy.wait("@createEmployee");

    //zuv msg dom-d garch irsn esehig shalgah
    cy.get("[data-sonner-toast]", { timeout: 8000 }).should(
      "contain.text",
      "Ажилтан амжилттай бүртгэгдлээ",
    );
  });

  it("checkbox дарвал ахлах ажилтан болгох модал гарна", () => {
    cy.intercept(
      { method: /(PATCH|PUT|POST)/, url: "**/admin/employees/**" },
      {
        statusCode: 200,
      },
    ).as("promoteEmployee");

    //husnegt deh checkbox darna
    cy.get("table")
      .contains("tr", "Bat")
      .find('button[role="checkbox"]')
      .click();

    cy.contains("Ахлах ажилтныг баталгаажуулах").should("be.visible");
    cy.get('[role="dialog"]').contains("Bat").should("be.visible");

    cy.get('[role="dialog"]').contains("button", "Зөвшөөрөх").click();
    cy.wait("@promoteEmployee");

    cy.get("[data-sonner-toast]", { timeout: 8000 }).should(
      "contain.text",
      "Ажилтныг ахлах ажилтан болголоо",
    );
  });
});
