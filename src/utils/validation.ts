export function validateName(name: string) {
  if (name.length < 5) return "Name must be at least 5 characters long";
  if (!/^[a-zA-Z]+$/.test(name)) return "Name must contain only letters";
  return "";
}

export function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(String(email).toLowerCase())) return "Invalid email address";
  if (!email.includes("@stud.noroff.no"))
    return "Your email must end with @stud.noroff.no";
  return "";
}
export function validatePassword(password: string) {
  if (password.length < 8) return "Password must be at least 8 characters long";
  if (!/[A-Z]/.test(password))
    return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(password))
    return "Password must contain at least one lowercase letter";
  if (!/[0-9]/.test(password))
    return "Password must contain at least one number";
  return "";
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string,
) {
  if (password !== confirmPassword) return "Passwords do not match";
  return "";
}
