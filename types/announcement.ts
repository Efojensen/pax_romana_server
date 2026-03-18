export interface Announcement {
    body: string,
    title: string,
    summary?: string,
    photo_url?: string,
    subgroups?: string | string[],
}