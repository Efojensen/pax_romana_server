import type { AdminData, CitizenData } from "./citizen"

export {}

declare global {
    namespace Express {
        export interface Request {
            admin?: AdminData
            citizen?: CitizenData
        }
    }
}