const {v4: uuidv4} = require('uuid');

describe('payment', () => {
    it('user can make payment', () => {
        // login 
        cy.visit('/')
        cy.findByRole('textbox',{name:/username/i}).type('johndoe')
        cy.findByLabelText(/password/i).type('s3cret')
        cy.findByRole('checkbox', {name: /remember me/i}).check()
        cy.findByRole('button', {name:/sign in/i}).click()
        
        // check balance
        let oldBalance;
        cy.get('[data-test="sidenav-user-balance"]')
        .then(bal => oldBalance = bal.text())
        .then(() => {console.log(oldBalance)})
        
        // click on New payment button
        cy.findByRole('button', {name: /new/i}).click()

        // search for user
        cy.findByRole('textbox').type('devon becker')
        cy.findByText(/devon becker/i).click()

        // enter amount note and click on pay
        const paymentAmount = '5.00'
        cy.findByPlaceholderText(/amount/i).type(paymentAmount);
        const note = uuidv4();
        cy.findByPlaceholderText(/add a note/i).type(note);
        cy.findByRole('button', {name: /pay/i}).click()

        // return to transactions
        cy.findByRole('button', {name: /return to transactions/i}).click()
        
        // go to personal payments
        cy.findByRole('tab', {name:/mine/i}).click()

        // click on the payment
        cy.findByText(note).click({force: true})

        // check payment was made
        cy.findByText(`-$${paymentAmount}`).should('be.visible')
        cy.findByText(note).should('be.visible')

        // check balance
        cy.get('[data-test="sidenav-user-balance"]')
        .then($bal => {
            const oldBal = parseFloat(oldBalance.replace(/\$|,/g,''))
            const newBal = parseFloat($bal.text().replace(/\$|,/g,''))
            expect(newBal).to.equal(oldBal - parseFloat(paymentAmount))
        })
    })
})