/// <reference types="cypress" />

const { split } = require("lodash");

function generateRandom(maxLimit = 100){
    let rand = Math.random() * maxLimit;
    console.log(rand); // say 99.81321410836433
  
    rand = Math.floor(rand); // 99
  
    return rand;
}

function selectAdultCount(byElementName,adult){
    for (let index = 1; index < adult; index++) {
        cy.get(byElementName).click()
    }

    cy.get('[data-testid="adult-count"]').should('have.text',adult)

}

function selectChildCount(byElementName,ages){
    const arr = ages.split(",")
    for (let index = 0; index < arr.length; index++) {
        cy.get(byElementName).click()
    }

    for (let index = 0; index < arr.length; index++) {
        cy.get('[data-testid=child-age-select]').eq(index).select(arr[index])
    }

    cy.get('[data-testid="child-count"]').should('have.text',arr.length)
}   


describe('example to-do app', () => {


    before(() => {
        cy.vrtStart();
        cy.viewport(1280, 720)
        cy.visit('https://www.enuygun.com/otel/')
    })

    after(() =>{
        cy.vrtStop();
    });



    it('send keys auto complete', () => {
        cy.get('[data-testid="header-logo"]').vrtTrack("header-logo-control",{
            retryLimit: 3
        })
        

        cy.wait(1000)
        cy.get('[class="footer-logo-wrapper"]').vrtTrack("footer-logo-control",{
            retryLimit: 3
        })
        cy.wait(1000)
        cy.get('.footer-social > .footer-social-links').vrtTrack("footer-social-control",{
            retryLimit: 3
        })
        let rand=generateRandom(15);
        let rand2=rand+generateRandom(7);
        cy.get('[data-testid=autocomplete-form-box]').click()
        cy.get('[data-testid="autocomplete-input"]').type('Antalya')
        cy.get('#react-autowhatever-1-section-0-item-0 > .sc-jRQBWg').click()
        cy.get('[data-testid="datepicker-form-box"]').click()
        cy.get('[data-testid=datepicker-day-valid]').eq(rand).click()
        cy.wait(500)
        cy.get('[data-testid=datepicker-day-valid]').eq(rand2).click()
        cy.wait(1000)
        cy.get('[data-testid="guest-form-box"]').click()
        cy.get('[data-testid=adult-remove-button]').click()
        selectAdultCount('[data-testid=adult-add-button]',2)
        selectChildCount('[data-testid=child-add-button]','4')
        cy.get('[data-testid="guest-form-submit"]').click()
        cy.get('[data-testid="search-form-button"]').click()
        cy.wait(5000)
        cy.get('#hotelList > :nth-child(2) > .mb-3').vrtTrack("axess control",{
            retryLimit: 3
        })
        cy.get('[data-testid="hotel-select-button"]').eq(0).scrollIntoView().click()
        cy.wait(3000)
        cy.get('[data-testid="room-select-button"]').eq(0).scrollIntoView().click()

        cy.get('[data-testid="contact-email"]').type('12412dfgd@enuygun.com')
        cy.get('[data-testid="contact-phone-number"]').type('43142342')
        cy.get('.HotelReservationSummary__footer').vrtTrack("spend-money-properties",{
            retryLimit:3
        })
        
        cy.get('[data-testid="adult-first-name"]').eq(0).clear().type('Suleyman')
        cy.get('[data-testid="adult-last-name"]').eq(0).clear().type('Tezcan')
        cy.get('[data-testid="male"]').eq(0).check()
        cy.get('[data-testid="adult-first-name"]').eq(1).clear().type('Suleyman')
        cy.get('[data-testid="adult-last-name"]').eq(1).clear().type('Tezcan')
        cy.get('[data-testid="male"]').eq(1).check()

        cy.get('[data-testid="child-first-name"]').eq(0).clear().type('Suleyman')
        cy.get('[data-testid="child-last-name"]').eq(0).clear().type('Tezcan')
        cy.get('[data-testid="birth-day"]').eq(0).select(14)
        cy.get('[data-testid="birth-month"]').eq(0).select(5)
        cy.get('[data-testid="birth-year"]').eq(0).select("2019")
        cy.get('[data-testid="proceed-to-payment-button"]').click()
        cy.get('.payment-icon-row').vrtTrack("payment-page-payment-icon-row",{
            retryLimit: 3
        })

        cy.get('[data-testid="credit-card-number"]').type('823948789237')
        cy.get('[data-testid="credit-card-month"]').select(12)
        cy.get('[data-testid="credit-card-year"]').select("1412")
        cy.get('[data-testid="credit-card-cvc"]').type('214')
        cy.get('[data-testid="payment-button"]').click()

        cy.get('[data-testid="success-icon"]').vrtTrack("success-icon",{
            retryLimit: 3
        })
        
    })




})
