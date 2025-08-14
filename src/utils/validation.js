// validation.js
import { regx } from "./regx";

export const validateEmail = (email) => {
  if (!email) {
    return "Email is required**";
  }
  if (!regx.emailRegx.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password) {
    return "Password is required**";
  }
  if (!regx.passwordRegx.test(password)) {
    return "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
  }
  return null;
};

export const validatePhoneNumber = (phonenumber) => {
  if (!phonenumber) {
    return "Phone number is required**";
  }
  if (!regx.phoneNumberRegx.test(phonenumber)) {
    return "Please enter a valid 10-digit phone number starting with 6-9";
  }
  return null;
};

// New validations for other fields:

export const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === "") {
    return `${fieldName} is required**`;
  }
  return null;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return "Confirm password is required**";
  }
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return null;
};
