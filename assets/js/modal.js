

// DOM Elements
const modalbg = document.querySelector(".bground");
const topNavElement = document.getElementById("myTopnav");
const reserveForm = document.querySelector("form[name='reserve']");
const modalBtn = document.querySelectorAll(".modal-btn");
const formDatas = document.querySelectorAll(".formData input");
const burgerIcon = document.querySelector(".icon");
const closeIcon = document.querySelector(".close");

const editNav = () => {
  
  if (topNavElement.className === "topnav") {
    topNavElement.className += " responsive";
  } else {
    topNavElement.className = "topnav";
  }
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  topNavElement.className = "topnav";
  modalbg.style.display = "block";
}

const closeModal = () => {
  const thanksModal = document.querySelector(".modal-thanks");

  if (thanksModal) {
    thanksModal.remove();
    reserveForm.style = "display: block;";
  }
  modalbg.style.display = "none";
};



//Burger menu

burgerIcon.addEventListener("click", editNav);




const checkName = (name) => {
  const nameRegex = /^[A-Za-z][A-Za-z\é\è\ê\-]+$/;
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
  const inputDate = input.value.split("-")
  const minYear = 1871;
  const maxYear = (new Date()).getFullYear();
  const maxMonth = (new Date()).getMonth() + 1;
  let errorMsg = "";

  


  if (inputDate[0] > maxYear || (inputDate[0] == maxYear && inputDate[1] > maxMonth) || (inputDate[0] == maxYear && inputDate[1] == maxMonth && inputDate[2] > (new Date()).getDate())) {
    
    errorMsg = "Vous ne pouvez pas être né dans le futur";    
  } else if (inputDate[0] < minYear) {
    
    errorMsg = "L'année de naissance doit être supérieure à 1870";
  }

    return errorMsg;
}

const checkQuantity = (quantity) => {
  const quantityRegex = /^[0-9]{1,2}$/;
  return quantityRegex.test(quantity);
}


// Verifier le champ du formulaire avec en argument l'input
const checkInput = (input) => {
    let errorMessage = '';
    const inputContainer = input.parentElement;
  
    // Verifier si le champ est vide
  if (!input.value.trim()) {
    errorMessage = "Veuillez renseigner ce champ";
    //return
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
  let nbTextErrors = 0;
  e.preventDefault();
  formDatas.forEach(input => {

    if (input.getAttribute("class") === "text-control") {
      checkInput(input);
      nbTextErrors += input.parentElement.dataset.error ? 1 : 0;
    } else if (input.type === "radio") {
      nbCheckedRadio += input.checked  ? 1 : 0;
      input.parentElement.dataset.error = nbCheckedRadio ? "" : "Veuillez choisir une ville";
      input.parentElement.dataset.errorVisible = !nbCheckedRadio ? "true" : "false";
    } else if (input.id === "checkbox1") {
      input.parentElement.dataset.error = input.checked ? "" : "Veuillez accepter les conditions d'utilisation";
      input.parentElement.dataset.errorVisible = !input.checked ? "true" : "false";
    }
  });

  if (nbCheckedRadio && formDatas[formDatas.length - 2].checked && !nbTextErrors) {
    console.log("everything is ok");
    reserveForm.reset();
    reserveForm.style = "display: none;";
    const newDiv = document.createElement("div");
    newDiv.className = "modal-thanks";
    newDiv.innerHTML = `<h2 id="title-thanks">Merci pour votre inscription </h2><a onClick="closeModal()" class="button" id='closeModal'>Fermer</a>`;

    document.querySelector('.modal-body').append(newDiv); 
  }
});

closeIcon.addEventListener("click", closeModal);




