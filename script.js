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
    setError(element);
  } else {
    removeError(element);
  }
}

function setError(element) {
  element.classList.add('error');
}

function removeError(element) {
  element.classList.remove('error');
}

function addValidateRequiredEventListener(element) {
  element.addEventListener('change', (e) => {
    validateRequired(e.target);
  });
}

function addCheckSamePasswordEventListener(element, otherElement) {
  element.addEventListener('change', (e) => {
    checkSamePassword(e.target, otherElement);
  });
  otherElement.addEventListener('change', (e) => {
    checkSamePassword(e.target, element);
  });
}

function checkSamePassword(passwordElement, confirmPasswordElement) {
  if (passwordElement.value !== confirmPasswordElement.value) {
    setError(passwordElement);
    setError(confirmPasswordElement);
  } else {
    removeError(passwordElement);
    removeError(confirmPasswordElement);
  }
}

function checkPasswordLength(requiredLength, passwordElement) {
  if (passwordElement.value < requiredLength) {
    setError(passwordElement);
  }
}

const submitButton = document.getElementById('submit-button');

const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('email');
const phoneNumberInput = document.getElementById('phone-number');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

const formItems = document.querySelectorAll('.form-field');
formItems.forEach(element => {
  addValidateRequiredEventListener(element);
});
addCheckSamePasswordEventListener(passwordInput, confirmPasswordInput);


// setInputValues();