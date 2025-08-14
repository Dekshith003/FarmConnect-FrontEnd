export const validateRegistrationData = (data) => {
  const errors = [];

  // Required field validation
  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.push("Full name must be at least 2 characters");
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Please provide a valid email address");
  }

  if (!data.password || data.password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  if (!data.phoneNumber || !/^[\d\s\-\+\(\)]+$/.test(data.phoneNumber)) {
    errors.push("Please provide a valid phone number");
  }

  if (!data.role || !["farmer", "buyer", "admin"].includes(data.role)) {
    errors.push("Please select a valid role");
  }

  return errors;
};

export const prepareRegistrationPayload = (formData) => {
  return {
    fullName: formData.fullName?.trim(),
    email: formData.email?.trim().toLowerCase(),
    password: formData.password,
    phoneNumber: formData.phoneNumber?.trim(),
    role: formData.role || "farmer",
  };
};
