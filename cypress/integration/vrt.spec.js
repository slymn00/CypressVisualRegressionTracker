describe("Test", () => {
    before(() => {
      cy.vrtStart();
    });
  
    after(() => {
      cy.vrtStop();
    });
  
    it(`VRT Test`, function () {
      cy.visit("/");
  
      cy.vrtTrack("Home page");
  
      cy.get("[name='q']").vrtTrack("Search field");
  
      cy.fixture("axess-desktop-domestic.png").then((logo) => {
        cy.vrtTrackBase64("Fixture image", logo);
      });
    });
});