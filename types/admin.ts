export interface AdminType {
    id?: string
    email: string
    lastName: string
    username: string
    pwd_hash: string
    firstName: string
    photo_url: string
}

export type UpdateAdminInput = {
    email?: string;
    lastName?: string;
    username?: string;
    password?: string;
    firstName?: string;
    photo_url?: string;
};
