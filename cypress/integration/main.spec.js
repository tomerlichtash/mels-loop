describe("Navigation", () => {
	it("should navigate to the about page", () => {
		cy.visit("http://localhost:3000/");
		cy.get('a[href*="about"]').click();
		cy.url().should("include", "/about");
		cy.get("h2").contains("About Mel's Loop Project");
	});
	it("should navigate to the story page", () => {
		cy.visit("http://localhost:3000/");
		cy.get('a[href*="story"]').click();
		cy.url().should("include", "/story");
		cy.get("h2").contains("The Story of Mel");
	});
});
