//Casos de prueba para Registro de usuario

describe('Sign up test-qa.inlaze', () => {

    beforeEach(() => {
        // Visita la página de inicio de sesión antes de cada prueba
        cy.visit('https://test-qa.inlaze.com/auth/sign-up')
    })

    it('C-1 Registro exitoso', () => {
        cy.get('#full-name').type('Usuario Prueba')
        cy.get('#email').type('ContraseñaCorrecta123');
        cy.get('#password').type('ContraseñaCorrecta123');
        cy.get('#confirmPassword').type('ContraseñaCorrecta123');
        cy.get('button[type="submit"]').click();
        // Verifica la redirección o mensaje de éxito
        cy.url().should('include', '/panel');
        cy.contains('Successful registration!').should('be.visible');
    })

    it('C-2 Validación formato campo Nombre', () => {
        // En el campo Fullname se ingresa solo una palabra
        cy.get('#full-name').type('Usuario');
        cy.get('#email').type('yasmin.camacho03@gmail.com');
        cy.get('#password').type('ContraseñaSegura123');
        cy.get(':nth-child(3) > .ng-untouched > .join > .btn').click();
        cy.get('#confirm-password').type('ContraseñaSegura123');
        cy.get('.mb-4 > .join > .btn').click();
        // Bajo el campo de Fullname se visualice notificación sobre debe ingresar dos palabras
        cy.contains('The name must contain at least 2 words (first name and last name).').should('be.visible');
        cy.get('button[type="submit"]').should('be.disabled');
    })

    it('C-3 Validación formato campo correo', () => {

    })

    it('C-4 Validación registro unico de correo', () => {
        cy.get('#full-name').type('Juan Pablo');
        // En el campo email se ingresa correo electrónico previamente registado
        cy.get('#email').type('yasmin.camacho03@gmail.com');
        cy.get('#password').type('Contraseña1');
        cy.get(':nth-child(3) > .ng-untouched > .join > .btn').click();
        cy.get('#confirm-password').type('Contraseña1');
        cy.get('.mb-4 > .join > .btn').click();
        cy.xpath('//button[@type="submit"]').click();
        // Se verifica se notifique que el Email ya se encuentra registrado 
        cy.contains('The email is already registered').should('be.visible');
    })

    it('C-5 Validación formato campo contraseña', () => {

    })

    it('C-6 Validación confirmación fallida de  contraseña', () => {
        cy.get('#full-name').type('Usuario prueba');
        cy.get('#email').type('nuevo_usuario@example.com');
        cy.get('#password').type('ContraseñaSegura123');
        // En el campo de contraseña se escribe una contraseña no coinciente con la anterior
        cy.get('#confirm-password').type('Contraseña1');
        // Se verifica se notifique que la contraseña y su confirmación no coinciden
        cy.contains('Passwords do not match').should('be.visible');
        cy.get('button[type="submit"]').should('be.disabled');
    })

    it('C-7 Validación obligatoriedad de los campos', () => {
        cy.get('button[type="submit"]').should('be.disabled');
        cy.get('#full-name').type('Usuario Prueba');
        cy.get('button[type="submit"]').should('be.disabled');
        cy.get('#email').type('nuevo_usuario@example.com');
        cy.get('button[type="submit"]').should('be.disabled');
        cy.get('#password').type('ContraseñaCorrecta123');
        cy.get('button[type="submit"]').should('be.disabled');
        cy.get('#confirm-password').type('ContraseñaCorrecta123');
        cy.get('button[type="submit"]').should('be.Enable');
    })
})