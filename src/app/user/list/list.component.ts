import { Component, effect, OnDestroy, signal } from '@angular/core';
import { Subscription } from "rxjs";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { ModalService } from "../../core/services/modal/modal.service";
import { listStore } from "./store/list.store";
import { SearchService } from "./service/list.service";
import { User } from "./models/user.model";
import { ViewComponent } from "../view/view.component";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnDestroy {
    private searchSubscription: Subscription | undefined;
    private searchTerm = signal<string>('');

    readonly backIcon = faChevronLeft;
    readonly nextIcon = faChevronRight;
    readonly listStore = listStore;

    paginatorPages: number[] = [];

    constructor(private readonly modalService: ModalService, private readonly searchService: SearchService) {
        effect(() => {
            if (this.listStore.totalPages() < 5) {
                this.paginatorPages = new Array(this.listStore.totalPages()).fill(0).map((_, i) => i + 1);
                return;
            }

            if (this.listStore.currentPage > 3) {
                this.paginatorPages = [
                    this.listStore.currentPage - 2,
                    this.listStore.currentPage - 1,
                    this.listStore.currentPage,
                    this.listStore.currentPage + 1,
                    this.listStore.currentPage + 2
                ];
                return;
            }

            if (this.listStore.currentPage > this.listStore.totalPages() - 3) {
                this.paginatorPages = [
                    this.listStore.totalPages() - 4,
                    this.listStore.totalPages() - 3,
                    this.listStore.totalPages() - 2,
                    this.listStore.totalPages() - 1,
                    this.listStore.totalPages(),
                ];
                return;
            }

            this.paginatorPages = [1, 2, 3, 4, 5];
        });
    }

    handleSearch(value: string) {
        // Cancel previous http call if any
        if (this.searchSubscription) {
            this.searchSubscription.unsubscribe();
        }

        this.searchTerm.set(value);
        this.searchSubscription = this.searchService.searchUsers(value).subscribe();
    }

    loadPage(page: number) {
        if (page <= 0 || page > this.listStore.totalPages()) {
            return;
        }

        this.searchSubscription = this.searchService.searchUsers(this.searchTerm(), page).subscribe();
    }

    handleUserClick(user: User) {
        this.searchService.getUserByLogin(user.login).subscribe(() => {
            this.modalService.create({
                component: ViewComponent,
            }).present();
        });
    }

    ngOnDestroy() {
        this.searchSubscription?.unsubscribe();
    }
}
