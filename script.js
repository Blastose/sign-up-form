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
  element.addEventListener('change', () => {
    if (checkSamePassword(element, otherElement)) {
      removeError(element);
      removeError(otherElement);
      removeErrorMessage(elementMessage);
      removeErrorMessage(otherElementMessage);
    } else {
      setError(element);
      setError(otherElement);
      setErrorMessage(otherElementMessage, "! Passwords must match");
    }
  });
  otherElement.addEventListener('change', () => {
    if (checkSamePassword(otherElement, element)) {
      removeError(element);
      removeError(otherElement);
      removeErrorMessage(elementMessage);
      removeErrorMessage(otherElementMessage);
    } else {
      setError(element);
      setError(otherElement);
      setErrorMessage(otherElementMessage, "! Passwords must match");
    }
  });
}

function checkSamePassword(passwordElement, confirmPasswordElement) {
  if (passwordElement.value !== confirmPasswordElement.value && confirmPasswordElement.value.length !== 0) {
    return false;
  } else {
    return true;
  }
}

function addCheckPasswordLengthEventListener(requiredLength, passwordElement, passwordMessage) {
  passwordElement.addEventListener('change', () => {
    if (checkPasswordLength(requiredLength, passwordElement)) {
      removeError(passwordElement);
      removeErrorMessage(passwordMessage);
    } else {
      setError(passwordElement);
      setErrorMessage(passwordMessage, "! Minimum 6 characters required")
    }
  })
}

function checkPasswordLength(requiredLength, passwordElement) {
  if (passwordElement.value.length < requiredLength) {
    return false;
  } else {
    return true;
  }
}

function addCheckEmailEventListener(element, elementMessage) {
  element.addEventListener('change', () => {
    if (checkEmail(element)) {
      removeError(element);
      removeErrorMessage(elementMessage);
    } else {
      setError(element);
      setErrorMessage(elementMessage, "! Enter an email address");
    }
  })
}

function checkEmail(emailElement) {
  if (/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(emailElement.value)) {
    return true;
  } else {
    return false;
  }
}

function setErrorMessage(elementId, message) {
  elementId.textContent = message;
}

function combineArrays(inputElement, inputErrorElement, inputErrorMessage) {
  return inputElement.map((element, index) => {
    return [element, inputErrorElement[index], inputErrorMessage[index]];
  });
}

function validateRequiredAll(firstNameInput, lastNameInput, emailInput, phoneNumberInput, passwordInput, confirmPasswordInput) {
  return validateRequired(firstNameInput) && validateRequired(lastNameInput) && validateRequired(emailInput) && validateRequired(phoneNumberInput) && validateRequired(passwordInput) && validateRequired(confirmPasswordInput);
}

function validFormSubmission(firstNameInput, lastNameInput, emailInput, phoneNumberInput, passwordInput, confirmPasswordInput) {
  return validateRequiredAll(firstNameInput, lastNameInput, emailInput, phoneNumberInput, passwordInput, confirmPasswordInput) && checkEmail(emailInput) && checkPasswordLength(6, passwordInput) && checkSamePassword(passwordInput, confirmPasswordInput);
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

submitButton.addEventListener('click', (e) => {
  console.log(validFormSubmission(firstNameInput, lastNameInput, emailInput, phoneNumberInput, passwordInput, confirmPasswordInput));
  if (!validFormSubmission(firstNameInput, lastNameInput, emailInput, phoneNumberInput, passwordInput, confirmPasswordInput)) {
    
  } else {
    document.forms['sign-up-form-element'].submit();
  }
});
