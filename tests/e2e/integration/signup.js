/// <reference types="Cypress" />
import {email, password, username, name} from "../fixtures/signup";

it("should signup user", () => {
    cy.intercept(
            "POST",
            Cypress.env("server") + "/user",
            {
                success: true,
                uid: "12345678910",
                tokens: {
                    access: "123.123.123",
                    refresh: "456.456.456",
                },
            },
            (req) => {
                expect(req.body.name).toEqual(name);
                expect(req.body.username).toEqual(username);
                expect(req.body.email).toEqual(email);
                expect(req.body.password).toEqual(password);
            }
    ).as("signup-route");

    cy.visit(Cypress.env("url") + "/signup");
    cy.get("main").toMatchImageSnapshot();

    cy.get("input[placeholder=\"Full name\"]").type(name);
    cy.get("input[placeholder=\"Username\"]").type(username);
    cy.get("input[placeholder=\"Email\"]").type(email);
    cy.get("input[placeholder=\"Password\"]").type(password);
    cy.get("input[placeholder=\"Password Confirm\"]").type(password);

    cy.get("button").click();
    cy.get("main").toMatchImageSnapshot();

    cy.wait(["@signup-route"]);
    cy.wait(1000);

    cy.location('pathname').should('eq', '/');
});


it("shouldn't signup user with no data", () => {
    cy.visit(Cypress.env("url") + "/signup");

    cy.get("button").click();

    cy.contains("Name is required")
    cy.contains("Username is required")
    cy.contains("Email is required")
    cy.contains("Password is required")
    cy.contains("Confirm your password")
    cy.get("main").toMatchImageSnapshot();

    cy.location('pathname').should('eq', '/signup');
});

it("should validate fields", () => {
    cy.visit(Cypress.env("url") + "/signup");

    cy.get("input[placeholder=\"Username\"]").type("Hey! I'm invalid!");
    cy.get("input[placeholder=\"Password\"]").type("123");
    cy.get("input[placeholder=\"Password Confirm\"]").type("12345");

    cy.get("button").click();

    cy.contains("Invalid username")
    cy.contains("Password must have minimum eight characters, at least one letter and one number")
    cy.contains("Passwords don't match")

    cy.location('pathname').should('eq', '/signup');
});

it("should say that email is not unique", () => {
    cy.intercept(
            "POST",
            Cypress.env("server") + "/user",
            {
                statusCode: 400,
                body: {
                    success: false,
                    error: "email-already-exists-error"
                }
            }
    ).as("signup-route");

    cy.visit(Cypress.env("url") + "/signup");

    cy.get("input[placeholder=\"Full name\"]").type(name);
    cy.get("input[placeholder=\"Username\"]").type(username);
    cy.get("input[placeholder=\"Email\"]").type(email);
    cy.get("input[placeholder=\"Password\"]").type(password);
    cy.get("input[placeholder=\"Password Confirm\"]").type(password);

    cy.get("button").click();

    cy.wait(["@signup-route"]);
    cy.contains("This email is already in use");
    cy.get("main").toMatchImageSnapshot();

    cy.location('pathname').should('eq', '/signup');
});

it("should say that username is not unique", () => {
    cy.intercept(
            "POST",
            Cypress.env("server") + "/user",
            {
                statusCode: 400,
                body: {
                    success: false,
                    error: "username-already-exists-error"
                }
            }
    ).as("signup-route");

    cy.visit(Cypress.env("url") + "/signup");

    cy.get("input[placeholder=\"Full name\"]").type(name);
    cy.get("input[placeholder=\"Username\"]").type(username);
    cy.get("input[placeholder=\"Email\"]").type(email);
    cy.get("input[placeholder=\"Password\"]").type(password);
    cy.get("input[placeholder=\"Password Confirm\"]").type(password);

    cy.get("button").click();

    cy.wait(["@signup-route"]);
    cy.contains("This username is already in use");
    cy.get("main").toMatchImageSnapshot();

    cy.location('pathname').should('eq', '/signup');
});



