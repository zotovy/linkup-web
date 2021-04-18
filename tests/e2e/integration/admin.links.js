import {user as rawUser, link} from "../../data";

const user = {
    ...rawUser,
    links: [
        {
            ...link,
            title: "Instagram",
        },
        {
            ...link,
            title: "Github",
        },
    ]
}

it("should load links", () => {
    cy.intercept(
            "GET",
            Cypress.env("server") + "/user/1",
            user,
    ).as("user-route");

    cy.login();
    cy.visit(Cypress.env("url") + "/admin");
    cy.wait(["@user-route"]);

    cy.get("main").toMatchImageSnapshot();

    cy.get("div[data-testid=\"user-in-header\"]").contains(user.name);

    cy.get("main>div").find("div[data-testid=\"link\"]").should("have.length", user.links.length);
    cy.get("main>div").find("div[data-testid=\"link\"]").eq(0).contains("Instagram");
    cy.get("main>div").find("div[data-testid=\"link\"]").eq(1).contains("Github");

    cy.get("main>div.phone-preview").children().eq(1).children().should("have.length", user.links.length);
});

it("should create new link", () => {
    cy.intercept("GET", Cypress.env("server") + "/user/1", user).as("user-route");
    cy.intercept("POST", Cypress.env("server") + "/link", user, req => {
        expect(req.title).toEqual(link.title);
        expect(req.subtitle).toEqual(link.subtitle);
        expect(req.href).toEqual(link.href);
        expect(req.userId).toEqual(user.id);
    }).as("link-route");

    cy.login();
    cy.visit(Cypress.env("url") + "/admin");
    cy.wait(["@user-route"]);

    cy.get("button").click();
    cy.get("main").toMatchImageSnapshot();
    //
    cy.get("div[data-testid=\"link-edit\"] > input[placeholder=\"Title\"]").eq(2).type(link.title);
    cy.get("div[data-testid=\"link-edit\"] > input[placeholder=\"Subtitle\"]").eq(2).type(link.subtitle);
    cy.get("div[data-testid=\"link-edit\"] > input[placeholder=\"Link\"]").eq(2).type(link.href);
    cy.get("div[data-testid=\"link-edit\"]").eq(2).contains("Change icon").click();
    cy.wait(200);
    cy.get("main").toMatchImageSnapshot();
    cy.get("div.scrollable>div").children().eq(1).click();
    cy.get("div[data-open=\"true\"] > span").contains("Save").click();
    cy.wait(1000);

    cy.get("main").toMatchImageSnapshot();
    cy.get("main>div").find("div[data-testid=\"link\"]").should("have.length", user.links.length + 1);
    cy.get("main>div.phone-preview").children().eq(1).children().should("have.length", user.links.length + 1);
});

it("should update link", () => {
    cy.intercept("GET", Cypress.env("server") + "/user/1", user).as("user-route");
    cy.intercept("PUT", Cypress.env("server") + "/link/1", user, req => {
        expect(req.title).toEqual(link.title);
        expect(req.subtitle).toEqual(link.subtitle);
        expect(req.href).toEqual(link.href);
        expect(req.userId).toEqual(user.id);
    }).as("link-route");

    cy.login();
    cy.visit(Cypress.env("url") + "/admin");
    cy.wait(["@user-route"]);

    cy.get("div[data-testid=\"link\"]").eq(1).click();
    cy.get("div[data-testid=\"link-edit\"] > input[placeholder=\"Title\"]").eq(1).focus().clear().type("Title");
    cy.get("div[data-testid=\"link-edit\"] > input[placeholder=\"Subtitle\"]").eq(1).focus().clear().type("Subject");
    cy.get("div[data-testid=\"link-edit\"] > input[placeholder=\"Link\"]").eq(1).focus().clear().type("www.google.com");
    cy.get("div[data-testid=\"link-edit\"]").eq(1).contains("Change icon").click();
    cy.get("div.scrollable>div").children().eq(12).click();
    cy.get("div[data-open=\"true\"] > span").contains("Save").click();
    cy.get("main").toMatchImageSnapshot();
});

it("should remove link", () => {
    cy.intercept("GET", Cypress.env("server") + "/user/1", user).as("user-route");
    cy.intercept("DELETE", Cypress.env("server") + "/link/1", user).as("link-route");

    cy.login();
    cy.visit(Cypress.env("url") + "/admin");
    cy.wait(["@user-route"]);
    cy.get("div[data-testid=\"link\"]").eq(1).click();
    cy.get("div[data-testid=\"link\"]").eq(1).contains("Delete").click();
    cy.get("main").toMatchImageSnapshot();
});

it("should validate link", () => {
    cy.intercept("GET", Cypress.env("server") + "/user/1", user).as("user-route");

    cy.login();
    cy.visit(Cypress.env("url") + "/admin");
    cy.wait(["@user-route"]);

    cy.get("div[data-testid=\"link\"]").eq(1).click();
    cy.get("div[data-testid=\"link-edit\"] > input[placeholder=\"Title\"]").eq(1).focus().clear().type("¬");
    cy.get("div[data-testid=\"link-edit\"] > input[placeholder=\"Subtitle\"]").eq(1).focus().clear().type("å");
    cy.get("div[data-testid=\"link-edit\"] > input[placeholder=\"Link\"]").eq(1).focus().clear().type("buga vuga");
    cy.get("div[data-open=\"true\"]").contains("Save").click();
    cy.wait(300);
    cy.get("main").toMatchImageSnapshot();
});




