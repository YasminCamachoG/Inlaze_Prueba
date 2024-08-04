//Casos de prueba para usuario Logueado

describe('Sesion en test-qa.inlaze', () => {
    beforeEach(() => {
        // Visita la página de inicio de sesión antes de cada prueba
        cy.visit('https://test-qa.inlaze.com/auth/sign-up')
        cy.fixture('userRegister').then((testdata) => {
            // Se realiza el login
            cy.get('#email').type(testdata.validUser.email);
            cy.get('#password').type(testdata.validUser.password);
            cy.xpath('//button[@type="submit"]').click();
        })
    })

    it('C-13 Nombre de usuario', function (params) {
        // Validar el nombre que se visualiza en la página una vez iniciada la sesion
        cy.fixture('userRegister').then((testdata) => {
            cy.get('.flex > .font-bold').should('have.text', this.testdata.name)
        })
    })

    it('C-14 Log out exitoso', () => {
        // Realizar 'Logout'
        cy.get('img').click()
        cy.contains('Logout').click();
        // Verificar que el usuario ha sido redirigido a la página de inicio de sesión
        cy.url().should('include', '/auth/sign-in');
    })
})