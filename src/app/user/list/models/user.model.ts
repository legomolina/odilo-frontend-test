import { Repository } from "./repository.model";

export type User = {
    avatarUrl: string,
    id: number,
    login: string,
    repositories?: Repository[],
    score: number,
    url: string,
}
