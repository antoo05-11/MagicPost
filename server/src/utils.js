import moment from "moment";

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
    if (isNaN(year) || isNaN(parseInt(year))) return false;
    if (isNaN(month) || isNaN(parseInt(month))) return false;
    if (isNaN(day) || isNaN(parseInt(day))) return false;

    if (parseInt(year) < 1970) return false;
    if (parseInt(month) > 12 || parseInt(month) < 0) return false;
    if (parseInt(day) > 31 || parseInt(day) < 0) return false;
    return true;
}

export function calculateDaysDifference(dateString1, dateString2) {
    if(!dateString1 || !dateString2) return null;
    const date1 = new Date(dateString1.substring(0, 4), dateString1.substring(4, 6) - 1, dateString1.substring(6, 8));
    const date2 = new Date(dateString2.substring(0, 4), dateString2.substring(4, 6) - 1, dateString2.substring(6, 8));

    const timeDifference = date2.getTime() - date1.getTime();

    const daysDifference = Math.round(timeDifference / (24 * 60 * 60 * 1000));

    return Math.abs(daysDifference);
}

export function formatDate(dateTime) {
    return moment(dateTime).format('YYYY-MM-DD').replace(/-/g, '');
}