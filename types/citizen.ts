export interface CitizenType {
    name: string,
    email: string,
    level: number,
    hostel: number,
    gender: string,
    pwdHash: string,
    program: number,
    birthDate: Date,
    phoneNumber: string,
}

export interface ReturnedCitizen {
    name: string,
    email: string,
    gender: string,
    phoneNumber: string,
}