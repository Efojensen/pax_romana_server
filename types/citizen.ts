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

export interface CitizenData {
    name?: string,
    email?: string,
    level?: string,
    gender?: string,
    birth_date?: Date,
    photo_url?: string,
    programme?: string,
    programme_id?: string,
    phone_number?: string,
    hall_or_hostel?: string,
    campus_residency?: string,
    subgroups?: string | string[]
}