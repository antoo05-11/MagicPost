const EmailValidator = require('email-validator');
const parsePhoneNumber = require('libphonenumber-js');
const db = require('../models');

const Employee = db.employees;
const Address = db.addresses;
const Commune = db.communes;
const District = db.districts;
const Province = db.provinces;

export const isValidName = (fullName) => {

}

export const isValidPhoneNumber = (phoneNumber, countryCode) => {
    if (phoneNumber.toString().length !== 10) return false;
    try {
        const parsedNumber = parsePhoneNumber(phoneNumber, countryCode);
        return parsedNumber.isValid();
    } catch (error) {
        return false;
    }
}

export const isValidIdentifier = (identifier) => {
    var regex = /^\d{12}$/;

    // Kiểm tra
    if (regex.test(chuoi)) {
        console.log("Chuỗi có đúng 12 chữ số.");
    } else {
        console.log("Chuỗi không có đúng 12 chữ số.");
    }
}

export const isValidAddress = (address) => {

}

export const isValidEmail = (email) => {
    return EmailValidator.validate(newUser.email);
}