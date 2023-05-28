let curUser = null;

const logInButton = document.querySelector('#log-in-button');
const errorLogInContainer = document.querySelector('#log-in-error-msg');

const profileInput = document.querySelector('#file-upload');
const profilePreviewContainer = document.querySelector('#profile-preview');

const registerButton = document.querySelector('#register-button');
const errorRegisterContainer = document.querySelector('#register-error-msg');

const logOutButton = document.querySelector('#log-out');

logInButton.addEventListener('click', logIn);
registerButton.addEventListener('click', register);
logOutButton.addEventListener('click', logOut);

profileInput.addEventListener('input', event => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
        profilePreviewContainer.innerHTML = `<img src="${fileReader.result}" alt="profile-preview"/>` ;
    }
    fileReader.readAsDataURL(event.target.files[0]);

});

function logIn (event) {
    event.preventDefault();

    const form = event.target.parentElement.parentElement;

    if (!form.checkValidity()) { // is the form valid?
        errorLogInContainer.textContent = 'One or more of the data you entered is incorrect';
        return;
    }

    const mail = form.email.value;
    const password = form.password.value;

    const xhr = new FXMLHttpRequest();
    xhr.onload = function (response) {

        if (response.password !== password) {
            errorLogInContainer.textContent = 'Incorrect password';
            return;
        }
 
        curUser = response;
        form.reset();
        App.nav(event);
    }

    xhr.onerror = function () {
        errorLogInContainer.textContent = 'User not found';
    }
    xhr.open('GET', `${App.name}/users/mail=${mail}`);
    xhr.send();
    
}

function register (event) {
    event.preventDefault();

    const form = event.target.parentElement.parentElement;

    if (!form.checkValidity()) { // is the form valid?
        errorRegisterContainer.textContent = 'One or more of the data you entered is incorrect';
        return;
    }

    if (!form['file-upload'].files[0]) {
        errorRegisterContainer.textContent = 'No profile picture uploaded';
        return;
    }

    const name = form.name.value;
    const mail = form.email.value;
    const password = form.password.value;
    const profile = profilePreviewContainer.firstChild.src;

    const didSucceed = {};
    addUser({
        name,
        mail,
        password,
        profile,
        concats: [],
    }, didSucceed)

    if (didSucceed.status) {
        form.reset();
        App.nav(event);
    }
}

function logOut (event) {
    curUser = null;
    App.nav(event);
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