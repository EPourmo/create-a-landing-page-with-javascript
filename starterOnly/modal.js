// navbar toggle (refactorisation)
document.querySelector(".icon").addEventListener("click", () => {
  const topNav = document.getElementById("myTopnav");
  if (topNav.classList.contains("responsive")) {
    topNav.classList.remove("responsive");
  } else {
    topNav.classList.add("responsive");
  }
});

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalClose = document.querySelector(".close");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBody = document.querySelector(".modal-body");
const formData = document.querySelectorAll(".formData");
const form = document.getElementById("form");
const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const checkbox = document.getElementsByName("location");
const termes = document.getElementById("checkbox1");
const inputData = document.querySelectorAll(".text-control");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal event
modalClose.addEventListener("click", closeModal);

// Close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// function to validate email pattern
const validateEmail = (emailInputValue) => {
  const mailformat = /\S+@\S+\.\S+/;
  return mailformat.test(emailInputValue);
};

// function to find if a radio button is selected
const radioButton = () => {
  let isSelected = false;
  for (let i = 0; i < checkbox.length; i++) {
    if (checkbox[i].checked) {
      isSelected = true;
    }
  }
  return isSelected;
};

// create a paragraphe for error messages
for (let i = 0; i < formData.length; i++) {
  const msgError = document.createElement("p");
  msgError.setAttribute("class", `msgError messageError${i}`);
  formData[i].appendChild(msgError);
}

// add class to input element (for border color)
for (let i = 0; i < inputData.length; i++) {
  inputData[i].classList.add(`txt-control-${i}`);
}

// determine if an error is present (if error : return true)
const formValidation = () => {
  const msgErrorElements = document.querySelectorAll(".msgError");
  for (let i = 0; i < msgErrorElements.length; i++) {
    if (msgErrorElements[i].style.display === "block") {
      return true;
    }
  }
};

// function to determine if error message is needed (display / remove error msg)
const entryValidation = (
  condition,
  messageClassNumb,
  message,
  hasInput = true
) => {
  if (condition) {
    document.querySelector(`.messageError${messageClassNumb}`).style.display =
      "block";
    document.querySelector(`.messageError${messageClassNumb}`).textContent =
      message;
    if (hasInput) {
      document.querySelector(
        `.txt-control-${messageClassNumb}`
      ).style.borderColor = "#ff4e60";
      document.querySelector(
        `.txt-control-${messageClassNumb}`
      ).style.borderWidth = "2px";
    }
  } else {
    document.querySelector(`.messageError${messageClassNumb}`).style.display =
      "none";
    if (hasInput) {
      document.querySelector(
        `.txt-control-${messageClassNumb}`
      ).style.borderColor = "transparent";
    }
  }
};

// form prevent default if error
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // firstname validation
  entryValidation(
    first.value.length < 2,
    0,
    "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
  );

  // lastname validation
  entryValidation(
    last.value.length < 2,
    1,
    "Veuillez entrer 2 caractères ou plus pour le champ du nom."
  );

  // email validation
  entryValidation(
    !validateEmail(email.value),
    2,
    "Veuillez entrer une adresse mail valide."
  );

  // birthday input validation
  entryValidation(
    !birthdate.value,
    3,
    "Vous devez entrer votre date de naissance."
  );

  // number validation
  entryValidation(!quantity.value, 4, "Vous devez indiquer un nombre.");

  // choice validation
  entryValidation(
    radioButton() === false,
    5,
    "Vous devez choisir une option.",
    false
  );

  // terms validation
  entryValidation(
    termes.checked === false,
    6,
    "Vous devez vérifier que vous acceptez les termes et conditions.",
    false
  );

  if (!formValidation()) {
    form.style.display = "none";
    const msgValidateForm = document.createElement("div");
    modalBody.appendChild(msgValidateForm);
    msgValidateForm.classList.add("validFormContainer");
    msgValidateForm.innerHTML = `
        <div class="validation-message">
          <h2>Merci pour</br> votre inscription</h2>
        </div>
        <div>
          <button href="#" class="btn-close-form button">Fermer
          </button>
        </div>`;

    // button close form
    document
      .querySelector(".btn-close-form")
      .addEventListener("click", closeModal);
  }
});
