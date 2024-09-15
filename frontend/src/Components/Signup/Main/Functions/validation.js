// validation.js
import { calculateAge } from "./utils";

// Check if string contains uppercase letter
export function containsUppercase(str) {
  return /[A-Z]/.test(str);
}

// Check if string contains special characters
export function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

// Validate email format
export function validateEmail(email) {
  if (!email) return "Email Required";
  if (!/@/.test(email)) return "Please enter a valid email that contains '@'!";
  if (!/\.[a-zA-Z]{2,}$/.test(email.split('@')[1])) return "Please enter a valid email domain.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
  return "";
}

// Validate password
export function validatePassword(password) {
  if (!password) return "Password Required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!containsUppercase(password)) return "Include at least one uppercase letter";
  if (!containsSpecialChars(password)) return "Include a special character in the password";
  return "";
}

// Validate confirm password
export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return "Password Required";
  if (confirmPassword !== password) return "Passwords don't match";
  return "";
}

// Validate date of birth
export function validateBirthdate(birthdate) {
  if (!birthdate) return "Required";
  if (calculateAge(birthdate) < 13) return "Your Age Must be +13";
  return "";
}

// Validate country
export function validateCountry(country) {
  if (!country) return "Country Required";
  return "";
}
