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

export function normalizeDate(date) {
    let dates = date.split('/');
    if (dates[0].length == 1) dates[0] = '0' + dates[0];
    if (dates[1].length == 1) dates[1] = '0' + dates[1];
    return dates[2] + '-' + dates[0] + '-' + dates[1];
}

export function checkDateFormat(date) {
    if(!date) return true;
    if (date.length != 8) return false;
    let year = date[0] + date[1] + date[2] + date[3];
    let month = date[4] + date[5];
    let day = date[6] + date[7];
    if (isNaN(year) || isNaN(parseFloat(year))) return false;
    if (isNaN(month) || isNaN(parseFloat(month))) return false;
    if (isNaN(day) || isNaN(parseFloat(day))) return false;

    if (parseInt(year) < 1970) return false;
    if (parseInt(month) > 12 || parseInt(month) < 0) return false;
    if (parseInt(day) > 31 || parseInt(day) < 0) return false;
    return true;
}