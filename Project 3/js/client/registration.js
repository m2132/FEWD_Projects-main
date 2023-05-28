const logInButton = document.querySelector('#log-in-button');
logInButton.addEventListener('click', logIn);

const logInForm = document.querySelector('#log-in form');
const errorLogInContainer = logInForm.querySelector('#error-msg');

const profileInput = document.querySelector('#file-upload');
const profilePreviewContainer = document.querySelector('#profile-preview');

profileInput.addEventListener('input', event => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
        profilePreviewContainer.innerHTML = `<img src="${fileReader.result}" alt="profile-preview"/>` ;
    }
    fileReader.readAsDataURL(event.target.files[0]);

})

let curUser = null;


function logIn (event) {
    event.preventDefault();
    errorLogInContainer.textContent = '';

    if (!logInForm.checkValidity()) {
        errorLogInContainer.textContent = 'One or more of the data you entered is incorrect';

        return;
    }

    const mail = logInForm.querySelector('#email-address').value;
    const password = logInForm.querySelector('#password').value;

    const xhr = new FXMLHttpRequest();
    xhr.onload = function (response) {

        if (response.password !== password) {
            errorLogInContainer.textContent = 'Incorrect password';
            return;
        }
 
        curUser = response;
        App.nav(event);
    }

    xhr.onerror = function (response) {
        errorLogInContainer.textContent = 'User not found';
    }
    xhr.open('GET', `${App.name}/users/mail=${mail}`);
    xhr.send();
    
}

const logOutButton = document.querySelector('#log-out');
logOutButton.addEventListener('click', logOut);

function logOut (event) {
    curUser = null;
    App.nav(event)
}

const registerButton = document.querySelector('#register-button');
registerButton.addEventListener('click', register);

const registerForm = document.querySelector('#register form');
const errorRegisterContainer = registerForm.querySelector('#error-msg');

function register (event) {
    event.preventDefault();
    errorRegisterContainer.textContent = '';


    if (!registerForm.checkValidity()) {
        errorRegisterContainer.textContent = 'One or more of the data you entered is incorrect';

        return;
    }

    const name = registerForm.querySelector('#name').value;
    const mail = registerForm.querySelector('#email-address').value;
    const password = registerForm.querySelector('#password').value;

    const file = registerForm.querySelector('#file-upload').files[0];
    if (!file) {
        errorRegisterContainer.textContent = 'No profile picture uploaded';
        return;
    }
    
    const didSucceed = {};
    addUser({
        name,
        mail,
        password,
        profile: profilePreviewContainer.firstElementChild.src,
        concats: [],
    }, didSucceed)

    if (didSucceed.status) {
        App.nav(event);
    }
}

function addUser (userDetails, statusObj) {
    const xhr = new FXMLHttpRequest();
    xhr.onload = function () {
        errorRegisterContainer.textContent = 'User already exists';
        statusObj.status = false;
    }

    xhr.onerror = function () {
        curUser = userDetails;

        const addUserXhr = new FXMLHttpRequest();
        addUserXhr.open('POST', `${App.name}/users`)
        addUserXhr.send(curUser);

        statusObj.status = true;
    }

    xhr.open('GET', `${App.name}/users/mail=${userDetails.mail}`);
    xhr.send();
    
}