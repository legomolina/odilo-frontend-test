import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { combineLatest, map, switchMap, tap } from "rxjs";
import { RepositoryResponse, SearchUserResponse, SearchUserUserResponse } from "../models/search-user-response.model";
import { searchStore } from "../store/search.store";
import { mapResponseToRepositoryList, mapResponseToUserList, mapResponseUserToUser } from "../factory/search.factory";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private static readonly BASE_URL = 'https://api.github.com';
    private static readonly MAX_RESULTS = 10;

    private readonly searchStore = searchStore;

    constructor(private readonly http: HttpClient) { }

    searchUsers(term: string, page = 1) {
        const url = `${SearchService.BASE_URL}/search/users`;
        const params = new HttpParams()
            .set('q', term)
            .set('page', page)
            .set('per_page', SearchService.MAX_RESULTS);

        return this.http.get<SearchUserResponse>(url, { params }).pipe(
            // This could be done in the last `tap` if map returns all data, but I think this could be extracted
            // in an external method, so we can update pagination apart from response entity model
            tap((response) => {
                this.searchStore.update((state) => ({
                    ...state,
                    totalCount: response.total_count,
                }))
            }),
            map(mapResponseToUserList),
            tap((users: User[]) => {
                this.searchStore.update((state) => ({
                    ...state,
                    currentPage: page,
                    users,
                }));
            }),
        );
    }

    getUserByLogin(userLogin: string) {
        const url = `${SearchService.BASE_URL}/users/${userLogin}`;

        return this.http.get<SearchUserUserResponse>(url).pipe(
            map(mapResponseUserToUser),
            switchMap((user) => {
                return this.getRepositories(user.login).pipe(
                    map(repositories => ({
                        ...user,
                        repositories
                    }))
                )
            }),
            tap((user: User) => {
                this.searchStore.update((state) => ({
                    ...state,
                    selectedUser: user,
                }))
            })
        )
    }

    getRepositories(userLogin: string) {
        const url = `${SearchService.BASE_URL}/users/${userLogin}/repos`;
        const params = new HttpParams()
            .set('type', 'owner')
            .set('page', 1)
            .set('per_page', 5); // Force get only first 5 repositories, this could be changed to add pagination

        return this.http.get<RepositoryResponse>(url, { params }).pipe(
            map(mapResponseToRepositoryList)
        );
    }
}
