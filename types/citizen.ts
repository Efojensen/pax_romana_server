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
    programme: string,
    phoneNumber: string,
}

export interface UpdateCitizenData {
    name?: string,
    email?: string,
    level?: string,
    gender?: string,
    birth_date?: Date,
    photo_url?: string,
    programme_id?: string,
    phone_number?: string,
    campus_residence?: string,
}