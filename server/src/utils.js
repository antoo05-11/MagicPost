export function generateRandomPassword() {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

export function normalizeName(name) {
    name = name.trim();
    name = name.toLowerCase();
    name = name.replace(/(^|\s)\S/g, (match) => match.toUpperCase());
    return name;
  }
  
  