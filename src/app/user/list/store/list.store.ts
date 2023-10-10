import { Store } from "../../../core/store/Store";
import { User } from "../models/user.model";
import { computed } from "@angular/core";

export type StoreState = {
    currentPage: number,
    totalCount: number,
    users: User[],
    selectedUser: User | null,
}

export class ListStore extends Store<StoreState> {
    get currentPage() {
        return this.signal().currentPage;
    }

    set currentPage(value: number) {
        this.update((state) => ({
            ...state,
            currentPage: value,
        }));
    }

    get totalPages() {
        return computed(() => Math.ceil(this.store().totalCount / 10));
    }

    get users() {
        return this.signal().users;
    }

    get selectedUser() {
        return this.signal().selectedUser;
    }
}

export const listStore = new ListStore({
    currentPage: 1,
    totalCount: 0,
    users: [],
    selectedUser: null
});

