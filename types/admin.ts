export interface AdminType {
    id?: string
    name: string
    email: string
    pwd_hash: string
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
