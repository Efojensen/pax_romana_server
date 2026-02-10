import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service : "gmail",
    host : "smtp.gmail.com",
    port : 3000,
    secure : false,
    auth : {
        user : process.env['EMAIL_ADDRESS'],
        pass : process.env['EMAIL_PWD']
    },
    tls : {
        rejectUnauthorized : false
    }
});

export default transporter