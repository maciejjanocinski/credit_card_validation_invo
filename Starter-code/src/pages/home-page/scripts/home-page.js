/// Homepage JavaScript File
/// Here we import all the JavaScript files we need for our homepage.

import '../styles/home-page.scss'



const button = document.querySelector('.form-component__button');

const nameInput = document.querySelector('.form-component__input--name');
const cardInput = document.querySelector('.form-component__input--card');
const dateInput = document.querySelector('.form-component__input--date');
const cvvInput = document.querySelector('.form-component__input--cvv');

const nameLabel = document.querySelector(`.form-component__name-label`)
const cardLabel = document.querySelector(`.form-component__card-label`)
const dateLabel = document.querySelector(`.form-component__date-label`)
const cvvLabel = document.querySelector(`.form-component__cvv-label`)

button.disabled = true;

button.addEventListener('click', event => {
    event.preventDefault();
    alert('Sukces')

    nameInput.value = "";
    cardInput.value = "";
    dateInput.value = "";
    cvvInput.value = "";

})

function validateCreditCardNumber(cardNumber) {

    cardNumber = cardNumber.replace(/\s/g, '');

    if (cardNumber.length !== 16) {
        return false;
    }


    let sum = 0;
    for (let i = 0; i < 16; i++) {
        let digit = parseInt(cardNumber.charAt(i));

        if (i % 2 === 0) {

            digit *= 2;


            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
    }

    return (sum % 10 === 0);
}

function validateCardExpirationDate(expirationDate) {
    const currentDate = new Date();
    const expirationMonthYear = expirationDate.split('/');
    const expirationMonth = parseInt(expirationMonthYear[0]);
    const expirationYear = parseInt(expirationMonthYear[1]) + 2000;

    if (isNaN(expirationMonth) || isNaN(expirationYear)) {
        return false;
    }

    if (expirationMonth < 1 || expirationMonth > 12) {
        return false;
    }

    const cardExpirationDate = new Date(expirationYear, expirationMonth, 0);

    if (cardExpirationDate < currentDate) {
        return false;
    }

    return true;
}

function validateCardholderName(name) {
    // Check if the name contains only letters and spaces
    const regex = /^[a-zA-Z ]+$/;
    if (!regex.test(name)) {
        return false;
    }

    // Check if the name has at least 2 words
    const words = name.split(' ');
    if (words.length < 2) {
        return false;
    }

    // All validation checks passed
    return true;
}

function validateCVV(cvv) {
    // Check if the CVV contains only digits
    const regex = /^[0-9]{3,4}$/;
    if (!regex.test(cvv)) {
        return false;
    }

    // All validation checks passed
    return true;
}


function checkAll() {
    (validateCVV(cvvInput.value)
        && validateCardExpirationDate(dateInput.value)
        && validateCardholderName(nameInput.value)
        && validateCreditCardNumber(cardInput.value))
        ? button.disabled = false
        : button.disabled = true
}

//name
nameInput.addEventListener('focus', () => {
    nameLabel.classList.remove('inactive-name');
})
nameInput.addEventListener('blur', () => {
    if (nameInput.value === "") {
        nameLabel.classList.add('inactive-name');
    }
})

nameInput.addEventListener('input', event => {

    if (validateCardholderName(event.target.value.trim())) {
        event.target.classList.remove('wrong');
        nameLabel.classList.remove('wrongLabel')
    } else {
        event.target.classList.add('wrong');
        nameLabel.classList.add('wrongLabel')
    }

    if (event.target.value.length === 0) {
        event.target.classList.remove('wrong');
        nameLabel.classList.remove('wrongLabel')
    }

    checkAll();
}
)

//card
cardInput.addEventListener('focus', () => {
    cardLabel.classList.remove('inactive-card');
})

cardInput.addEventListener('blur', () => {
    if (cardInput.value === "") {
        cardLabel.classList.add('inactive-card');
    }


})

cardInput.addEventListener('input', (event) => {
    validateCreditCardNumber(event.target.value);
    event.target.value = event.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();

    if (validateCreditCardNumber(event.target.value)) {
        event.target.classList.remove('wrong');
        cardLabel.classList.remove('wrongLabel')
    } else {
        event.target.classList.add('wrong');
        cardLabel.classList.add('wrongLabel')
    }

    if (event.target.value.length === 0) {
        event.target.classList.remove('wrong');
        cardLabel.classList.remove('wrongLabel')
    }

    checkAll();
})

//date
dateInput.addEventListener('focus', () => {
    dateLabel.classList.remove('inactive-date');
})

dateInput.addEventListener('blur', () => {
    if (dateInput.value === "") {
        dateLabel.classList.add('inactive-date');
    }
})

dateInput.addEventListener('keydown', (e) => {
    const input = e.target;
    const value = input.value;
    const valueLength = value.length;
    if (e.key === 'Backspace') {
        // Jeśli użytkownik nacisnął klawisz Backspace, usuń ostatni znak
        return;
    }

    // Sprawdź, czy wpisano już drugi znak i czy nie ma już "/"
    if (valueLength === 2 && value.indexOf('/') === -1 && value[2] !== '/') {
        input.value = value + '/';
    }
});

dateInput.addEventListener('input', event => {
    if (validateCardExpirationDate(event.target.value)) {
        event.target.classList.remove('wrong');
        dateLabel.classList.remove('wrongLabel')
    } else {
        event.target.classList.add('wrong');
        dateLabel.classList.add('wrongLabel')
    }

    if (event.target.value.length === 0) {
        event.target.classList.remove('wrong');
        dateLabel.classList.remove('wrongLabel')
    }

    checkAll();
}
)



//cvv
cvvInput.addEventListener('focus', () => {
    cvvLabel.classList.remove('inactive-cvv');
})

cvvInput.addEventListener('blur', () => {
    if (cvvInput.value === "") {
        cvvLabel.classList.add('inactive-cvv');
    }
})


cvvInput.addEventListener('input', event => {
    if (validateCVV(event.target.value)) {
        event.target.classList.remove('wrong');
        cvvLabel.classList.remove('wrongLabel')
    } else {
        event.target.classList.add('wrong');
        cvvLabel.classList.add('wrongLabel')
    }

    if (event.target.value.length === 0) {
        event.target.classList.remove('wrong');
        cvvLabel.classList.remove('wrongLabel')
    }

    checkAll();
}
)



