const form = document.getElementById("form")! as HTMLFormElement;
const username = document.getElementById("username")! as HTMLInputElement;
const email = document.getElementById("email")! as HTMLInputElement;
const password = document.getElementById("password")! as HTMLInputElement;
const password2 = document.getElementById("password2")! as HTMLInputElement;

// Set Error message
const setError = function (input: HTMLInputElement, mesaage: string) {
  const formControl = input.parentElement;
  formControl?.classList.add("error");
  formControl?.classList.remove("success");

  const small = formControl?.querySelector("small");
  if (small) small.textContent = mesaage;
};

// Set Success message
const setSuccess = function (input: HTMLInputElement) {
  const formControl = input.parentElement;
  formControl?.classList.remove("error");
  formControl?.classList.add("success");
};

// Check Required
const checkRequired = function (inputArr: HTMLInputElement[]) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      setError(input, `${getFieldName(input)} is required`);
    } else {
      setSuccess(input);
    }
  });
};

// Check length of input
const checkLength = function (
  input: HTMLInputElement,
  min: number,
  max: number
) {
  if (input.value.trim().length < min) {
    setError(input, `${getFieldName(input)} must be at least ${min} charaters`);
  } else if (input.value.trim().length > max) {
    setError(
      input,
      `${getFieldName(input)} must be less than ${max} charaters`
    );
  } else {
    setSuccess(input);
  }
};

// Check email
const checkEmail = function (input: HTMLInputElement) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    setSuccess(input);
  } else {
    setError(input, "Email is not valid");
  }
};

//Check password match
const checkPasswordMatch = function (
  input1: HTMLInputElement,
  input2: HTMLInputElement
) {
  if (input1.value !== input2.value) {
    setError(input2, "Passwords do not match");
  }
};

const getFieldName = function (input: HTMLInputElement) {
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
