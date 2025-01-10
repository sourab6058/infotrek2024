const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[$#@()!%^&*]).{8,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export { passwordRegex, emailRegex };
