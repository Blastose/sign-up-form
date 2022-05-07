function setInputValues() {
  const firstNameInput = document.getElementById('first-name');
  const lastNameInput = document.getElementById('last-name');
  const emailInput = document.getElementById('email');
  const phoneNumberInput = document.getElementById('phone-number');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');

  firstNameInput.value = "Jim";
  lastNameInput.value = "Jim";
  emailInput.value = "Jim";
  phoneNumberInput.value = "604-666-6666";
  passwordInput.value = "Jim";
  confirmPasswordInput.value = "Jim";
}

function validateRequired(element) {
  if (element.value.length <= 0) {
    return false;
  } else {
    return true;
  }
}

function setError(element) {
  element.classList.add('error');
}

function removeError(element) {
  element.classList.remove('error');
}

function removeErrorMessage(element) {
  element.textContent = "";
}

function addValidateRequiredEventListener(element, elementTextmessage, message) {
  element.addEventListener('change', () => {
    if (validateRequired(element)) {
      removeError(element);
      removeErrorMessage(elementTextmessage);
    } else {
      setError(element);
      setErrorMessage(elementTextmessage, message)
    }
  });
}

function addCheckSamePasswordEventListener(element, elementMessage, otherElement, otherElementMessage) {
  element.addEventListener('change', (e) => {
    checkSamePassword(e.target, elementMessage, otherElement, otherElementMessage);
  });
  otherElement.addEventListener('change', (e) => {
    checkSamePassword(e.target, elementMessage, element, otherElementMessage);
  });
}

function checkSamePassword(passwordElement, passwordElementMessage, confirmPasswordElement, confirmPasswordMessage) {
  if (passwordElement.value !== confirmPasswordElement.value && confirmPasswordElement.value.length !== 0) {
    setError(passwordElement);
    setError(confirmPasswordElement);
    setErrorMessage(confirmPasswordMessage, "! Passwords must match");
  } else {
    removeError(passwordElement);
    removeError(confirmPasswordElement);
    removeErrorMessage(passwordElementMessage);
    removeErrorMessage(confirmPasswordMessage);
  }
}

function addCheckPasswordLengthEventListener(requiredLength, passwordElement, passwordMessage) {
  passwordElement.addEventListener('change', () => {
    checkPasswordLength(requiredLength, passwordElement, passwordMessage);
  })
}

function checkPasswordLength(requiredLength, passwordElement, passwordMessage) {
  if (passwordElement.value.length < requiredLength) {
    setError(passwordElement);
    setErrorMessage(passwordMessage, "! Minimum 6 characters required")
  } else {
    removeError(passwordElement);
    removeErrorMessage(passwordMessage);
  }
}

function addCheckEmailEventListener(element, elementMessage) {
  element.addEventListener('change', (e) => {
    checkEmail(e.target, elementMessage);
  })
}

function checkEmail(emailElement, elementMessage) {
  if (/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(emailElement.value)) {
    removeError(emailElement);
    removeErrorMessage(elementMessage);
  } else {
    setError(emailElement);
    setErrorMessage(elementMessage, "! Enter an email address");
  }
}

function validEmail(emailAddress) {

}

function setErrorMessage(elementId, message) {
  elementId.textContent = message;
}

function combineArrays(inputElement, inputErrorElement, inputErrorMessage) {
  return inputElement.map((element, index) => {
    return [element, inputErrorElement[index], inputErrorMessage[index]];
  });
}

const submitButton = document.getElementById('submit-button');

const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('email');
const phoneNumberInput = document.getElementById('phone-number');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

const formItems = Array.from(document.querySelectorAll('.form-field'));
const formItemMessages = Array.from(document.querySelectorAll('.error-message'));
const messages = ["! Enter your first name", "! Enter your last name", "! Enter an email address", "! Enter your phone number", "! Minimum 6 characters required", "! Passwords do not match"];

const errorArray = combineArrays(formItems, formItemMessages, messages);

errorArray.forEach(arr => {
  addValidateRequiredEventListener(arr[0], arr[1], arr[2]);
});

const confirmPasswordMessage = document.getElementById('confirm-password-error-message');
const passwordMessage = document.getElementById('password-error-message');
addCheckSamePasswordEventListener(passwordInput, passwordMessage, confirmPasswordInput, confirmPasswordMessage);
addCheckPasswordLengthEventListener(6, passwordInput, passwordMessage);

const emailMessage = document.getElementById('email-error-message');
addCheckEmailEventListener(emailInput, emailMessage);



// setInputValues();