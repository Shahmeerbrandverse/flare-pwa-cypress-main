export function LoginClass() {
    function LoginPage() {
        cy.visit('https://farwarestaurant.alpha.chikoo.app/login');
    }
    function MobileNumber() {
        cy.get("[data-id='phone-number-tx']").type('332002471');
    }
    function PinNumber() {
        cy.get("input[type=tel]").each((input) => {
            cy.wrap(input).type("0");
        })
    }
    function LoginButton() {
        cy.contains("Login").click();
        cy.wait(5000);
    }
    return {
        MobileNumber,
        PinNumber,
        LoginButton,
        LoginPage

    }
}