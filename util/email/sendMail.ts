import transporter from '../../config/email'
import type { sendingEmailType } from '../../types/email';

const sendMail = (emailType: sendingEmailType) => {
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    transporter.sendMail(emailType, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: ", info.response);
        }
    })
}

export default sendMail