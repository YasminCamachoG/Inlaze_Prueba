//Casos de prueba para Registro de usuario

describe('Sign up test-qa.inlaze', () => {

    beforeEach(() => {
        // Visita la página de inicio de sesión antes de cada prueba
        cy.visit('https://test-qa.inlaze.com/auth/sign-up')
    })

    it('C-1 Registro exitoso', () => {
        cy.fixture('userSignup').then((testdata) => {
            cy.get('#full-name').type(testdata.validUser.fullName)
            cy.get('#email').type(testdata.validUser.email);
            cy.get('#password').type(testdata.validUser.password);
            cy.get('#confirmPassword').type(testdata.validUser.password);
            cy.get('button[type="submit"]').click();
            // Verifica la redirección o mensaje de éxito
            cy.url().should('include', '/panel');
            cy.contains('Successful registration!').should('be.visible');
        })
    })

    it('C-2 Validación formato campo Nombre', () => {
        cy.fixture('userSignup').then((testdata) => {
            // En el campo Fullname se ingresa solo una palabra
            cy.get('#full-name').type(testdata.invalidUser.fullName)
            cy.get('#email').type(testdata.validUser.email);
            cy.get('#password').type(testdata.validUser.password);
            cy.get(':nth-child(3) > .ng-untouched > .join > .btn').click();
            cy.get('#confirmPassword').type(testdata.validUser.password);
            cy.get('.mb-4 > .join > .btn').click();
            cy.get('button[type="submit"]').click();
            // Bajo el campo de Fullname se visualice notificación sobre debe ingresar dos palabras
            cy.contains('The name must contain at least 2 words (first name and last name).').should('be.visible');
            cy.get('button[type="submit"]').should('be.disabled');
        })
    })

    it('C-3 Validación formato campo correo', () => {
        cy.fixture('userSignup').then((testdata) => {
            cy.get('#full-name').type(testdata.validUser.fullName)
            // En el campo correo se ingresa uno que no cumpla con las condiciones  
            cy.get('#email').type(testdata.invalidUser.email);
            cy.get('#password').type(testdata.validUser.password);
            cy.get(':nth-child(3) > .ng-untouched > .join > .btn').click();
            cy.get('#confirmPassword').type(testdata.validUser.password);
            cy.get('.mb-4 > .join > .btn').click();
            cy.get('button[type="submit"]').click();
            // Bajo el campo de Email se visualice notificación sobre el formato del correo
            cy.contains('The email is not valid').should('be.visible');
            cy.get('button[type="submit"]').should('be.disabled');
        })
    })

    it('C-4 Validación registro unico de correo', () => {  
        cy.fixture('userSignup').then((testdata) => {
            cy.get('#full-name').type(testdata.validUser.fullName)
        // En el campo email se ingresa correo electrónico previamente registado
            cy.get('#email').type(testdata.UserRegister.email);
            cy.get('#password').type(testdata.UserRegister.password);
            cy.get(':nth-child(3) > .ng-untouched > .join > .btn').click();
            cy.get('#confirmPassword').type(testdata.UserRegister.password);
            cy.get('.mb-4 > .join > .btn').click();
            cy.get('button[type="submit"]').click();
            cy.xpath('//button[@type="submit"]').click();
        // Se verifica se notifique que el Email ya se encuentra registrado 
        cy.contains('The email is already registered').should('be.visible');
        })
    })

    it('C-5 Validación formato campo contraseña', () => {
        cy.fixture('userSignup').then((testdata) => {
            cy.get('#full-name').type(testdata.validUser.fullName)
            cy.get('#email').type(testdata.validUser.email);
            cy.get('#password').type(testdata.invalidUser.password1);
            cy.get(':nth-child(3) > .ng-untouched > .join > .btn').click();
            cy.get('#confirmPassword').type(testdata.invalidUser.password1);
            cy.get('.mb-4 > .join > .btn').click();
            // Bajo el campo la contraseña se visualice notificación sobre el formato de la contraseña
            cy.contains('The password does not meet the length and character requirements.').should('be.visible');
            cy.get('button[type="submit"]').should('be.disabled');
        })
    })

    it('C-6 Validación confirmación fallida de  contraseña', () => {
        cy.fixture('userSignup').then((testdata) => {
            cy.get('#full-name').type(testdata.validUser.fullName)
            cy.get('#email').type(testdata.validUser.email);
            cy.get('#password').type(testdata.validUser.password);
            cy.get(':nth-child(3) > .ng-untouched > .join > .btn').click();
            // En el campo de confirmacion de contraseña se escribe una contraseña no coinciente con la anterior
            cy.get('#confirmPassword').type(testdata.invalidUser.password1);
            cy.get('.mb-4 > .join > .btn').click();
            // Se verifica se notifique que la contraseña y su confirmación no coinciden
            cy.contains('Passwords do not match').should('be.visible');
            cy.get('button[type="submit"]').should('be.disabled');
        })
    })

    it('C-7 Validación obligatoriedad de los campos', () => {
        cy.fixture('userSignup').then((testdata) => {
            // Se verifica no se encuentre disponible la opción de hacer sign up
            cy.get('button[type="submit"]').should('be.disabled');
            // Se diligencia el formulario par habilitar la opción de hacer sign up
            cy.get('#full-name').type(testdata.validUser.fullName)
            cy.get('#email').type(testdata.validUser.email);
            cy.get('#password').type(testdata.validUser.password);
            cy.get('#confirmPassword').type(testdata.validUser.password);
            cy.get('button[type="submit"]').should('be.Enable');
            // Se valida obligatoriedad del campo nombre
            cy.get('#full-name').clear()
            cy.get('button[type="submit"]').should('be.disabled');
            // Se valida obligatoriedad del campo email
            cy.get('#full-name').type(testdata.validUser.fullName)
            cy.get('#email').clear()
            cy.get('button[type="submit"]').should('be.disabled');
            // Se valida obligatoriedad del campo contraseña
            cy.get('#password').type(testdata.validUser.password);
            cy.get('#password').clear()
            cy.get('button[type="submit"]').should('be.disabled');
            // Se valida obligatoriedad del campo confirmación de la contraseña
            cy.get('#password').type(testdata.validUser.password);
            cy.get('#password').clear()
            cy.get('button[type="submit"]').should('be.disabled');
        })
    })
})