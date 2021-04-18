import {user } from "../../data";

it("should load settings", () => {
    cy.intercept("GET", Cypress.env("server") + "/user/1", user).as("user-route");

    cy.login();
    cy.visit(Cypress.env("url") + "/admin?tab=settings");
    cy.wait(["@user-route"]);
    cy.get("main").toMatchImageSnapshot();
});

it("should change settings", () => {
    const name = "Ivan";

    cy.intercept("GET", Cypress.env("server") + "/user/1", user).as("user-route");
    cy.intercept("PUT", Cypress.env("server") + "/user/1", { ...user, name }).as("user-route");
    cy.intercept("POST", Cypress.env("server") + "/user/1/change-profile-image", "https://i1.sndcdn.com/artworks-iLMjRSS80z4MPvvj-DzR4vA-t500x500.jpg").as("user-route");

    cy.login();
    cy.visit(Cypress.env("url") + "/admin?tab=settings");
    cy.wait(["@user-route"]);

    cy.fixture('test-image.jpeg').then(fileContent => {
        cy.get('input[type="file"]').attachFile({
            fileContent: fileContent.toString(),
            fileName: 'test-image.jpeg',
            mimeType: 'image/jpeg'
        });
    });
    cy.get("input[placeholder=\"Your name\"]").focus().clear().type(name);
    cy.get("button[role='primary']").click();
    cy.wait(300);

    cy.get("main").toMatchImageSnapshot();
});
