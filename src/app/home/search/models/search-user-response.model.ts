export type SearchUserResponse = {
    total_count: number,
    items: SearchUserUserResponse[],
}

export type SearchUserUserResponse = {
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
