import type { CitizenType } from "./citizen";

export interface typeOfEmail {
    recipient: CitizenType
    sender: string | undefined;
}

export interface sendingEmailType {
    from: string
    to: string
    subject: string
    html: string
}