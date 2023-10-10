import { RepositoryResponse, ListUserResponse, ListUserUserResponse } from "../models/list-user-response.model";
import { User } from "../models/user.model";
import { Repository } from "../models/repository.model";

export const mapResponseToUserList = (response: ListUserResponse): User[] => {
    return response.items.map(mapResponseUserToUser);
}

export const mapResponseToRepositoryList = (response: RepositoryResponse): Repository[] => {
    return response.map((repository) => ({
        description: repository.description,
        id: repository.id,
        name: repository.name,
        isPrivate: repository.private,
        stars: repository.stargazers_count,
        updatedAt: new Date(repository.updated_at),
    }));
}

export const mapResponseUserToUser = (responseUser: ListUserUserResponse): User => {
    return ({
        avatarUrl: responseUser.avatar_url,
        id: responseUser.id,
        login: responseUser.login,
        repositories: [],
        score: responseUser.score,
        url: responseUser.html_url,
    });
}
