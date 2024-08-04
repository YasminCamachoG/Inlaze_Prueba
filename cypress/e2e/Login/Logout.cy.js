//Casos de prueba para usuario Logueado

describe('Sesion en test-qa.inlaze', () => {

    beforeEach(() => {
        // Visita la página de inicio de sesión antes de cada prueba
        cy.visit('https://test-qa.inlaze.com/')
        // Login exitoso
        cy.get('#email').type("yasmin.camacho03@gmail.com")
        cy.get('#password').type("Contraseña1")
        cy.xpath('//button[@type="submit"]').click()
         cy.url().should('include', '/panel');
    })

    it('C-13 Nombre de usuario', () => {
        // Validar el nombre que se visualiza en la página una vez iniciada la sesion
        cy.get(".flex > .font-bold").should('have.text', 'Juan Pablo')
    })

    it('C-14 Log out exitoso', () => {
        // Realizar 'Logout'
        cy.get('img').click()
        cy.contains('Logout').click();
        // Verificar que el usuario ha sido redirigido a la página de inicio de sesión
        cy.url().should('include', '/auth/sign-in');
    })

})