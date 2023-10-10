import { Component, effect, OnDestroy, signal } from '@angular/core';
import { searchStore } from "./store/search.store";
import { SearchService } from "./service/search.service";
import { Subscription } from "rxjs";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { User } from "./models/user.model";
import { fadeOut } from "../../shared/animations/fadeOut";
import { fadeIn } from "../../shared/animations/fadeIn";
import { ModalService } from "../../core/services/modal/modal.service";
import { ViewComponent } from "../view/view.component";

@Component({
    animations: [fadeIn, fadeOut],
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnDestroy {
    private searchSubscription: Subscription | undefined;
    private searchTerm = signal<string>('');

    readonly backIcon = faChevronLeft;
    readonly nextIcon = faChevronRight;
    readonly searchStore = searchStore;

    paginatorPages: number[] = [];

    constructor(private readonly modalService: ModalService, private readonly searchService: SearchService) {
        effect(() => {
            if (this.searchStore.totalPages() < 5) {
                this.paginatorPages = new Array(this.searchStore.totalPages()).fill(0).map((_, i) => i + 1);
                return;
            }

            if (this.searchStore.currentPage > 3) {
                this.paginatorPages = [
                    this.searchStore.currentPage - 2,
                    this.searchStore.currentPage - 1,
                    this.searchStore.currentPage,
                    this.searchStore.currentPage + 1,
                    this.searchStore.currentPage + 2
                ];
                return;
            }

            if (this.searchStore.currentPage > this.searchStore.totalPages() - 3) {
                this.paginatorPages = [
                    this.searchStore.totalPages() - 4,
                    this.searchStore.totalPages() - 3,
                    this.searchStore.totalPages() - 2,
                    this.searchStore.totalPages() - 1,
                    this.searchStore.totalPages(),
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
        if (page <= 0 || page > this.searchStore.totalPages()) {
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
