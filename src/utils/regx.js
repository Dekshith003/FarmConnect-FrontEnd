export const regx = {
  emailRegx: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email regex
  passwordRegx:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/, // At least 8 chars, upper, lower, number, special
  phoneNumberRegx: /^[6-9]\d{9}$/, // 10 digit phone starting with 6-9
  username: /^[a-zA-Z0-9_]{3,20}$/, // 3–20 chars, letters, numbers, underscore
};
