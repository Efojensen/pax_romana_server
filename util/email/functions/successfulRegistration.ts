import type { sendingEmailType, typeOfEmail } from "../../../types/email";
import SuccessfulAdminRegistrationHTML from "../../templates/SuccessfulAdminRegistration.template";

export const SuccessfulAdminRegistration = (emailDetails: typeOfEmail): sendingEmailType => {
    return {
        from: "Pax Romana KNUST",
        to: emailDetails.recipient.email,
        subject: 'Welcome to the PAX Romana Admin Platform',
        html: SuccessfulAdminRegistrationHTML(emailDetails.recipient)
    }
}