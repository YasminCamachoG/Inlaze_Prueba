//Casos de prueba para usuario Logueado

describe('Sesion en test-qa.inlaze', () => {
    before(() => {
        // Visita la página de inicio de sesión antes de cada prueba
        cy.visit('https://test-qa.inlaze.com/');
        cy.fixture('userLogin').as('testdata');
        cy.get('#email').type("yasmin.camacho03@gmail.com");
        cy.get('#password').type("Contraseña1");
        // Encuentra el botón de inicio de sesión y da clic en él
        cy.get('[type="submit"]').click();
        // Se verifica el inicio de sesión fue exitoso
        cy.url().should('include', '/panel');
    })

    it('C-13 Nombre de usuario', function (params) {
        // Validar el nombre que se visualiza en la página una vez iniciada la sesion
        cy.get('.flex > .font-bold').should('have.text',this.testdata.name )
    })

    it('C-14 Log out exitoso', () => {
        // Realizar 'Logout'
        cy.get('img').click()
        cy.contains('Logout').click();
        // Verificar que el usuario ha sido redirigido a la página de inicio de sesión
        cy.url().should('include', '/auth/sign-in');

    })

})