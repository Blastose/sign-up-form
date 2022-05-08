function setError(element) {
  element.classList.add('error');
}

function removeError(element) {
  element.classList.remove('error');
}

function setErrorMessage(elementId, message) {
  elementId.textContent = message;
}

function removeErrorMessage(element) {
  element.textContent = "";
}

function checkRequired(element) {
  if (element.value.length <= 0) {
    return false;
  } else {
    return true;
  }
}

function addCheckRequiredEventListener(element, elementTextmessage, message) {
  element.addEventListener('change', () => {
    if (checkRequired(element)) {
      removeError(element);
      removeErrorMessage(elementTextmessage);
    } else {
      setError(element);
      setErrorMessage(elementTextmessage, message)
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

function addCheckSamePasswordEventListener(element, elementMessage, otherElement, otherElementMessage) {
  element.addEventListener('change', () => {
    if (checkSamePassword(element, otherElement) && checkPasswordLength(6, element)) {
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
    if (checkSamePassword(otherElement, element) && checkPasswordLength(6, element)) {
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

function checkPasswordLength(requiredLength, passwordElement) {
  if (passwordElement.value.length < requiredLength) {
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

function checkEmail(emailElement) {
  if (/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(emailElement.value)) {
    return true;
  } else {
    return false;
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

function combineArrays(inputElement, inputErrorElement, inputErrorMessage) {
  return inputElement.map((element, index) => {
    return [element, inputErrorElement[index], inputErrorMessage[index]];
  });
}

function checkRequiredAll(firstNameInput, lastNameInput, emailInput, phoneNumberInput, passwordInput, confirmPasswordInput) {
  return checkRequired(firstNameInput) && checkRequired(lastNameInput) && checkRequired(emailInput) && checkRequired(phoneNumberInput) && checkRequired(passwordInput) && checkRequired(confirmPasswordInput);
}

function validFormSubmission(firstNameInput, lastNameInput, emailInput, phoneNumberInput, passwordInput, confirmPasswordInput) {
  return checkRequiredAll(firstNameInput, lastNameInput, emailInput, phoneNumberInput, passwordInput, confirmPasswordInput) && checkEmail(emailInput) && checkPasswordLength(6, passwordInput) && checkSamePassword(passwordInput, confirmPasswordInput);
}

function validateFormSubmission(formArray) {
  formArray.forEach((element) => {
    if (!checkRequired(element[0])) {
      setError(element[0]);
      setErrorMessage(element[1], element[2]);
    }
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

const formArray = combineArrays(formItems, formItemMessages, messages);

formArray.forEach(arr => {
  addCheckRequiredEventListener(arr[0], arr[1], arr[2]);
});

const confirmPasswordMessage = document.getElementById('confirm-password-error-message');
const passwordMessage = document.getElementById('password-error-message');
addCheckSamePasswordEventListener(passwordInput, passwordMessage, confirmPasswordInput, confirmPasswordMessage);
addCheckPasswordLengthEventListener(6, passwordInput, passwordMessage);

const emailMessage = document.getElementById('email-error-message');
addCheckEmailEventListener(emailInput, emailMessage);

submitButton.addEventListener('click', () => {
  validateFormSubmission(formArray);
  if (validFormSubmission(firstNameInput, lastNameInput, emailInput, phoneNumberInput, passwordInput, confirmPasswordInput)) {
    document.forms['sign-up-form-element'].submit();
  }
});
