import type { AdminData } from "./citizen"

export {}

declare global {
    namespace Express {
        export interface Request {
            admin?: AdminData
        }
    }
}