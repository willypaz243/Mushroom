var validated=false;

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");

    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e, next => {
        e.preventDefault();
        // setFormMessage(loginForm, "error", "Invalid username/password combination");
        alert(loginForm.getElementById(signinUser));
        next(); // sent to backend
    });

    createAccountForm.addEventListener("submit", e, next =>{
        e.preventDefault();
        var user = document.getElementById('signupUsername').value;
        var email = document.getElementById('signupEmail').value;
        var password = document.getElementById('signupPassword').value;
        var repassword = document.getElementById('signupRePassword').value;
        if(validated){
            next(); // envia los datos al backend;
        }
    });
    
    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length < 5) {
                setInputError(inputElement, "Username must be at least 5 characters in length");
                validated=false;
            }else{
                if (e.target.id==="signupEmail" && !validateEmail(inputElement.value)){
                    setInputError(inputElement, "Email debe ser un correo electronico");
                    validated=false;
                }else{
                    if(e.target.id === "signupPassword" && inputElement.value.length < 8) {
                        setInputError(inputElement, "La contraseña debe tener al menos 8 caracteres");
                        validated=false;
                    }else{
                        if(e.target.id === "signupRePassword" && inputElement.value != document.getElementById('signupPassword').value) {
                            setInputError(inputElement, "Las contraseñas deben ser iguales");
                            validated=false;
                        }else{
                            validated=true;
                        }
                    }
                }
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
    
});
