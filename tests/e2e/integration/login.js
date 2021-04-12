/// <reference types="Cypress" />
import {email, password} from "../fixtures/login";

it("User can login", () => {
    cy.intercept(
            "POST",
            Cypress.env("server") + "/user/authenticate",
            {
                success: true,
                uid: "12345678910",
                tokens: {
                    access: "123.123.123",
                    refresh: "456.456.456",
                },
            },
            (req) => {
                expect(req.body.email).toEqual(email);
                expect(req.body.password).toEqual(password);
            }
    ).as("login-route");

    cy.visit(Cypress.env("url") + "/login");

    cy.get("input[placeholder=\"Enter your email\"]").type(email);
    cy.get("input[placeholder=\"Enter your password\"]").type(password);

    cy.get("button").click();

    cy.wait(["@login-route"]);
    cy.wait(1000);

    cy.location('pathname').should('eq', '/');
});

it("User can't login with invalid credentials", () => {
    const wrongEmail = "the1ime@yandex.ru";

    cy.intercept(
            "POST",
            Cypress.env("server") + "/user/authenticate",
            {
                statusCode: 404,
                body: {
                    success: false,
                }
            },
            (req) => {
                expect(req.body.email).toEqual(wrongEmail);
                expect(req.body.password).toEqual(password);
            }
    ).as("login-route");

    cy.visit(Cypress.env("url") + "/login");

    cy.get("input[placeholder=\"Enter your email\"]").type(wrongEmail);
    cy.get("input[placeholder=\"Enter your password\"]").type(password);

    cy.get("button").click();

    cy.wait(["@login-route"]);
    cy.wait(1000);

    cy.get("div:contains(\"Invalid email or password\")");

    cy.location('pathname').should('eq', '/login');
});
