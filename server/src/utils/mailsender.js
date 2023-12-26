import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'magicpost.uet.vnu@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

export const sendPasswordToNewUserMail = async (mailAddress, password) => {
    const mailOption = {
        from: 'magicpost.uet.vnu@gmail.com',
        to: mailAddress,
        subject: 'Welcome to our Magicpost!',
        text: `Here is your new password: ${password}. Thanks!`
    };
    await transporter.sendMail(mailOption);
};

export const sendMailVerifiedCode = async (mailAddress, code) => {
    const mailOption = {
        from: 'magicpost.uet.vnu@gmail.com',
        to: mailAddress,
        subject: 'Change password for MagicPost!',
        text: `To change your password, enter this code to verifying box: ${code}. Thanks!`
    };
    await transporter.sendMail(mailOption);
}