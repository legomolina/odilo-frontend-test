export type ListUserResponse = {
    total_count: number,
    items: ListUserUserResponse[],
}

export type ListUserUserResponse = {
    avatar_url: string,
    id: number,
    login: string,
    score: number,
    html_url: string,
}

export type RepositoryResponse = {
    description: string,
    id: number,
    private: boolean,
    name: string,
    stargazers_count: number,
    updated_at: string,
}[]
