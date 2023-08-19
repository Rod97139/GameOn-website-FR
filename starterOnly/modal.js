const editNav = () => {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const reserveForm = document.querySelector("form[name='reserve']");
const modalBtn = document.querySelectorAll(".modal-btn");
const formDatas = document.querySelectorAll(".formData input");


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}



const checkName = (name) => {
  const nameRegex = /^[a-z]+[ \-']?[[a-z]+[ \-']?]*[a-z]+$/;
  const nameTest = nameRegex.test(name);
  return nameTest;
}

const checkEmail = () => {
  const email = document.getElementById("email").value;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const emailTest = emailRegex.test(email);
  return emailTest;
}

const checkBirthdate = () => {
  const input = document.getElementById("birthdate");
  const minYear = 1902;
  const maxYear = (new Date()).getFullYear();
  let errorMsg = "";

  re = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

    if(input.value != '') {
      if(regs = input.value.match(re)) {
        if(regs[1] < 1 || regs[1] > 31) {
          errorMsg = "Invalid value for day: " + regs[1];
        } else if(regs[2] < 1 || regs[2] > 12) {
          errorMsg = "Invalid value for month: " + regs[2];
        } else if(regs[3] < minYear || regs[3] > maxYear) {
          errorMsg = "Invalid value for year: " + regs[3] + " - must be between " + minYear + " and " + maxYear;
        }
      } else {
        errorMsg = "Invalid date format: " + input.value;
      }
    }

    return errorMsg;
}

const checkQuantity = (quantity) => {
  const quantityRegex = /^[0-9]{1,2}$/;
  const quantityTest = quantityRegex.test(quantity);
  return quantityTest;
}


// Verifier le champ du formulaire avec en argument l'input
const checkInput = (input) => {
    let errorMessage = '';
    const inputContainer = input.parentElement;
    console.log(input.value.trim());
  
    // Verifier si le champ est vide
  if (!input.value.trim()) {
    errorMessage = "Veuillez renseigner ce champ";
    // Si il n'est pas vide, verifier si le format est correct en fonction de l'id de l'input
  } else {

    switch (input.id) {
      case "first":
      case "last":
        errorMessage = checkName(input.value) ? "" : "Veuillez entrer au moins 2 caractères valides";
        break;
      case "email":
        errorMessage = checkEmail() ? "" : "Veuillez entrer une adresse email valide";
        break;
      case "birthdate":
        errorMessage = checkBirthdate();
        break;
      case "quantity":
        errorMessage = checkQuantity(input.value) ? "" : "Veuillez entrer un nombre entre 0 et 99";
        break;
    }
  }
  // if (errorMessage) {
  // input.focus();
  // }
  inputContainer.dataset.error = errorMessage;
  inputContainer.dataset.errorVisible = (!!errorMessage).toString();
}

// Form events
//ne fonctionne pas avec checkbox et radio
reserveForm.addEventListener("blur", e => checkInput(e.target), true);

reserveForm.addEventListener("submit", e => {
  let nbCheckedRadio = 0;
  let agreeConditionsBox = document.getElementById("checkbox1").checked;
  e.preventDefault();
  formDatas.forEach(box => {
    if (box.getAttribute("class") === "text-control") {
      checkInput(box);
    } else if (box.type === "radio") {
      nbCheckedRadio += box.checked  ? 1 : 0;
      box.parentElement.dataset.error = nbCheckedRadio ? "" : "Veuillez choisir une ville";
      box.parentElement.dataset.errorVisible = !nbCheckedRadio ? "true" : "false";
    } else if (box.id === "checkbox1") {
      box.parentElement.dataset.error = agreeConditionsBox ? "" : "Veuillez accepter les conditions d'utilisation";
      box.parentElement.dataset.errorVisible = !agreeConditionsBox ? "true" : "false";
    }
  });
});




