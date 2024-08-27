"use strict";
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
// Set Error message
const setError = function (input, mesaage) {
    const formControl = input.parentElement;
    formControl?.classList.add("error");
    formControl?.classList.remove("success");
    const small = formControl?.querySelector("small");
    if (small)
        small.textContent = mesaage;
};
// Set Success message
const setSuccess = function (input) {
    const formControl = input.parentElement;
    formControl?.classList.remove("error");
    formControl?.classList.add("success");
};
// Check Required
const checkRequired = function (inputArr) {
    inputArr.forEach((input) => {
        if (input.value.trim() === "") {
            setError(input, `${getFieldName(input)} is required`);
        }
        else {
            setSuccess(input);
        }
    });
};
// Check length of input
const checkLength = function (input, min, max) {
    if (input.value.trim().length < min) {
        setError(input, `${getFieldName(input)} must be at least ${min} charaters`);
    }
    else if (input.value.trim().length > max) {
        setError(input, `${getFieldName(input)} must be less than ${max} charaters`);
    }
    else {
        setSuccess(input);
    }
};
// Check email
const checkEmail = function (input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        setSuccess(input);
    }
    else {
        setError(input, "Email is not valid");
    }
};
//Check password match
const checkPasswordMatch = function (input1, input2) {
    if (input1.value !== input2.value) {
        setError(input2, "Passwords do not match");
    }
};
const getFieldName = function (input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};
console.log(getFieldName(username));
form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 8, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);
});
