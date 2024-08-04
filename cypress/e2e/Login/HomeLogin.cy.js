//Casos de prueba para Login 

describe('Login test-qa.inlaze', () => {

    beforeEach(() => {
        // Visita la página de inicio de sesión antes de cada prueba
        cy.visit('https://test-qa.inlaze.com/')
    })

    it('C-8 Login Existoso', () => {
        // Encuentra el campo de correo electrónico y escribe la dirección
        cy.get('#email').type("yasmin.camacho03@gmail.com");
        // Encuentra el campo de contraseña y escribe la contraseña
        cy.get('#password').type("Contraseña1");
        // Encuentra el botón de visualización de la contraseña y da clic
        cy.get('.join > .btn').click();
        // Encuentra el botón de inicio de sesión y da clic en él
        cy.xpath('//button[@type="submit"]').click();
        // Se verifica el inicio de sesión fue exitoso
        cy.url().should('include', '/panel');
    })

    it('C-9 Login fallido por correo no registrado', () => {
        // En el campo de correo electrónico se escribe una dirección de correo no registado
        cy.get('#email').type("yasmin.camacho05@gmail.com");
        cy.get('#password').type("Contraseña1");
        cy.xpath('//button[@type="submit"]').click();
        cy.contains('User not found').should('be.visible');

    })

    it('C-10 Login fallido por error en el la contraseña', () => {
        cy.get('#email').type("yasmin.camacho03@gmail.com");
        // En el campo de contraseña se escribe una contraseña incorrecta
        cy.get('#password').type("Contraseña10");
        cy.xpath('//button[@type="submit"]').click();
        cy.contains("Password doesn't match").should('be.visible');
    })

    it('C-11 Activación de botón Sign in - Sin correo', () => {
        cy.get('#email').click();
        cy.get('#password').type("Contraseña1");
        // Se verifica no se habilite,ni tenga funcionalidad el botón de log in sin el datos de correo
        cy.xpath('//button[@type="submit"]').should('be.disabled');
    })

    it('C-12 Activación de botón Sign in - Sin contraseña', () => {
        cy.get('#email').type("yasmin.camacho03@gmail.com");
        cy.get('#password').click();
        // Se verifica no se habilite,ni tenga funcionalidad el botón de log in sin el datos de contraseña
        cy.xpath('//button[@type="submit"]').should('be.disabled');
    })
})
