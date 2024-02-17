export const getInitials = (firstName: string, lastName?: string): string => {
  // Get the first character of the first name
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";

  // Get the first character of the last name if available
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";

  // Combine the initials
  const initials = `${firstInitial}${lastInitial}`;

  return initials;
};

export const inputFields = [
  {
    name: "name",
    id: "name",
    type: "text",
    placeholder: "John Doe",
    label: "Name",
    isSignUp: true,
  },
  {
    name: "email",
    id: "email",
    type: "email",
    placeholder: "name@example.com",
    label: "Email",
  },

  {
    name: "password",
    id: "password",
    type: "password",
    placeholder: "******",
    label: "Password",
  },

  {
    name: "confirmPassword",
    id: "password",
    type: "password",
    placeholder: "******",
    label: "Re-enter Password",
    isSignUp: true,
  },
];

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  // Password must be at least 8 characters and include at least one lowercase letter,
  // one uppercase letter, one number, and one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  return passwordRegex.test(password);
};
