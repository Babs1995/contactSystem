// Create name highlight
const nameElement = document.querySelector("#name");
nameElement.focus();
//Hide the "text field" with the id of "other-job-role"
const otherJobRole = document.getElementById("other-job-role");
const jobTitle = document.getElementById("title");
otherJobRole.style.display = "none";

//When a changed, display/hide the "text field" based on selection
jobTitle.addEventListener("change", (e) => {
        if (e.target.value === "other") {
            otherJobRole.style.display = '';
        } else {
            otherJobRole.style.display = 'none';
        }
    });
//"T-Shirt Info"
let designChoice = document.querySelector('#design'); 
let shirtColor = document. getElementById('color');
let colorOptions = document.querySelectorAll('#color option');
shirtColor.disabled = true; 

// Dropdown menu should display only the color options 
// associated with the selected design
designChoice.addEventListener("change", (e) => {
    shirtColor.disabled = false; 
        for (let i=0; i < shirtColor.length; i++) {
        const colorValue = e.target.value;
        let dataTheme = shirtColor.children[i].getAttribute("data-theme");
        if (dataTheme) {
            if (colorValue === dataTheme) {
                colorOptions[i].hidden = false; 
                colorOptions[i].setAttribute("selected", true);
            } else {
                colorOptions[i].hidden = true;
                colorOptions[i].removeAttribute("selected", false);
            }
        }
    }
});
//"Register for Activities"
let activitiesFieldset = document.querySelector('.activities');
let totalCostDisplay = document.querySelector('.activities-cost');
let totalCost = 0;

activitiesFieldset.addEventListener('change', (e) => {
    //console.log(e.target.value)
    const dataCost = parseInt(e.target.getAttribute('data-cost'));
    if (e.target.checked) {
        totalCost += dataCost;  
    } else {
        totalCost -= dataCost; 
    }
    totalCostDisplay.innerHTML = `Total Cost: $${totalCost}`;
});

//"Payment Info"
const formOfPayment = document.getElementById("payment");
const paymentOption = document.querySelectorAll("#payment option")
console.log(paymentOption.value)
const creditCard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");

paypal.hidden = true;
bitcoin.hidden = true;
// Use the payment variable above to target the element’s second child element 
let secondChild = formOfPayment.children[1];
secondChild.setAttribute("selected", true);

formOfPayment.addEventListener("change", (e) => {
    let inputValue = e.target.value;

    if (inputValue === "paypal") {
        paypal.style.display = "block";
        creditCard.style.display = "none";
        bitcoin.style.display = "none";
    } else if (inputValue === "bitcoin") {
        bitcoin.style.display = "block";
        paypal.style.display = "none";
        creditCard.style.display = "none";
    } else if (inputValue === "credit-card") {
        creditCard.style.display = "block";
        paypal.style.display = "none";
        bitcoin.style.display = "none";
    }
});

// Form validation - create variables for all input fields 
let emailAddress = document.getElementById("email");
let cardNumber = document.getElementById("cc-num");
let zipCode = document.getElementById("zip");
let formElement = document.querySelector("form"); 
let cvv = document.getElementById("cvv"); 

function validationPass(element) {
    element.parentElement.classList.remove("not-valid");
    element.parentElement.classList.add("valid");
    element.parentElement.lastElementChild.style.display = "none"; 
};
function validationFail(element) {
    element.parentElement.classList.remove("valid");
    element.parentElement.classList.remove("valid");
    element.parentElement.lastElementChild.style.display = "block";
};
function nameValidator() {
    let nameValue = nameElement.value;
    //console.log(nameValue)
    let validName = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
    if (validName === true) {
        validationPass(nameElement);
    } else {
        validationFail(nameElement);
    }
    return validName;
};
console.log(emailAddress.value);
function emailValidator() {
    let emailValue = emailAddress.value;
    console.log(emailValue);
    const validEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    if (validEmail) {
        validationPass(emailAddress);
    } else {
        validationFail(emailAddress);
    }
    return validEmail;
};
let activitiesBox = document.querySelector("#activities-box")
function activitiesValidator() {
    let validActivities = totalCost > 0 
    console.log(validActivities)
    if (validActivities) {
        validationPass(activitiesBox);
    } else {
        validationFail(activitiesBox);
    }
    return validActivities;
}
function cardValidator() {
    let cardValue = cardNumber.value;
    let validCard = /^\d{13,16}$/.test(cardValue);
    let cvvCodeValue = cvv.value;
    const validCvvCode = /^[0-9]{3}$/.test(cvvCodeValue);
    const zipCodeValue = zipCode.value;
    const validZipCode = /(^\d{5}$)| (^\d{5}-\d{4}$)/.test(zipCodeValue);

if(validCard)  {
    validationPass(cardNumber);
} else {
    validationFail(cardNumber);
}
if(validZipCode) {
    validationPass(zipCode);
} else {
    validationFail(zipCode);
}
if(validCvvCode) {
    validationPass(cvv);
} else {
    validationFail(cvv);
}
return validCard && validZipCode && validCvvCode;
}
function validationPass(element){
    element.parentElement.classList.add("valid");
    element.parentElement.classList.remove("not-valid");
    element.parentElement.lastElementChild.style.display = "none";
};
function validationFail(element) {
    element.parentElement.classList.add("not-valid");
    element.parentElement.classList.remove("valid");
    element.parentElement.lastElementChild.style.display = "block";
};
// Event listener, use the name validation test variable and an if statement to check
formElement.addEventListener("submit", (e) => {
    if (!nameValidator()) {
        e.preventDefault();
    }
    if (!emailValidator()) {
        e.preventDefault();
    }
    if (!activitiesValidator()) {
        e.preventDefault();
    }
    if (formOfPayment.value === "credit-card"){
        if (!cardValidator()) {
            e.preventDefault();
        }
    }
});
// Accessibility
let checkboxes = document.querySelectorAll('input[type=checkbox]');
for (let i=0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('focus', (e) => {
        checkboxes[i].parentElement.classList = "focus";  
    });
    checkboxes[i].addEventListener('blur', (e) => {
        checkboxes[i].parentElement.classList.remove("focus");
    });
};