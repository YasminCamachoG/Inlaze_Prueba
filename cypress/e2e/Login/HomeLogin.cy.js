//Casos de prueba para Login 
describe('Login test-qa.inlaze', () => {

    beforeEach(() => {
        // Visita la página de inicio de sesión antes de cada prueba
        cy.visit('https://test-qa.inlaze.com/auth/sign-up')
    })

    it('C-8 Login Existoso', () => {
        cy.fixture('userRegister.json').then((testdata) => {
            // Encuentra el campo de correo electrónico y escribe el correo
            cy.get('#email').type(testdata.validUser.email);
            // Encuentra el campo de contraseña y escribe la contraseña
            cy.get('#password').type(testdata.validUser.password);
            // Encuentra el botón de visualización de la contraseña y da clic
            cy.get(':nth-child(3) > .ng-untouched > .join > .btn').click();
            // Encuentra el botón de inicio de sesión y da clic en él
            cy.xpath('//button[@type="submit"]').click();

            // Se verifica el inicio de sesión fue exitoso
            cy.url().should('include', '/panel');
        })
    })

    // Casos Fallidos

    it('C-9 Login fallido por correo no registrado', () => {
        cy.fixture('userLogin').then((testdata) => {
            // En el campo de correo electrónico se escribe una dirección de correo no registado
            cy.get('#email').type(testdata.invalidUser.email);
            cy.get('#password').type(testdata.invalidUser.password);
            cy.xpath('//button[@type="submit"]').click();
            cy.contains('User not found').should('be.visible');
        })
    })

    it('C-10 Login fallido por error en el la contraseña', () => {
        cy.fixture('userLogin').then((testdata) => {
            cy.get('#email').type(testdata.validUser.email);
            // En el campo de contraseña se escribe una contraseña incorrecta
            cy.get('#password').type(testdata.invalidUser.password);
            cy.xpath('//button[@type="submit"]').click();
            cy.contains("Password doesn't match").should('be.visible');
        }) 
    })

    it('C-11 Activación de botón Sign in - Sin correo', () => {
        cy.fixture('userLogin').then((testdata) => {
            cy.get('#email').clear();
            // En el campo de contraseña se escribe una contraseña
            cy.get('#password').type(testdata.validUser.password);
            // Se verifica no se habilite,ni tenga funcionalidad el botón de log in sin el dato de correo
            cy.xpath('//button[@type="submit"]').should('be.disabled');
        }) 
    })

    it('C-12 Activación de botón Sign in - Sin contraseña', () => {
        cy.fixture('userLogin').then((testdata) => {
            // Solo se ingresa el email
            cy.get('#email').type(testdata.validUser.email);
            cy.get('#password').clear();
            // Se verifica no se habilite,ni tenga funcionalidad el botón de log in sin el dato de contraseña
            cy.xpath('//button[@type="submit"]').should('be.disabled');
        })
    })
})
