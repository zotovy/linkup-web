import {user, link} from "../../data";


it("should load themes", () => {
    cy.intercept(
            "GET",
            Cypress.env("server") + "/user/1",
            user,
    ).as("user-route");

    cy.login();
    cy.visit(Cypress.env("url") + "/admin?tab=theme");
    cy.wait(["@user-route"]);
    cy.get("main").toMatchImageSnapshot();
});

it("should change theme", () => {
    cy.intercept("GET", Cypress.env("server") + "/user/1", user).as("user-route");
    cy.intercept("POST", Cypress.env("server") + "/user/1/theme/1", user);

    cy.login();
    cy.visit(Cypress.env("url") + "/admin?tab=theme");
    cy.wait(["@user-route"]);

    cy.get("div[data-testid=\"theme\"]").eq(1).click();
    cy.wait(300);

    cy.get("main").toMatchImageSnapshot();
});
