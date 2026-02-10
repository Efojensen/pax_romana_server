import type { adminType } from "./admin";

export interface typeOfEmail {
    recipient: adminType
    sender: string | undefined;
}

export interface sendingEmailType {
    from: string
    to: string
    subject: string
    html: string
}