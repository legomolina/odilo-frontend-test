import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, Subject, Subscription, tap } from "rxjs";

@Component({
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit, OnDestroy {
    private static readonly DEBOUNCE_TIME = 400;
    private static readonly BANNED_WORDS = ['gcpglobal'];
    private static readonly MIN_LENGTH = 4;

    private readonly searchText$ = new Subject<string>();
    private searchSubscription: Subscription | undefined;

    @Input() placeholder = 'Search user...';
    @Output() search = new EventEmitter<string>();

    handleSearch(event: KeyboardEvent) {
        this.searchText$.next((event.target as HTMLInputElement).value);
    }

    ngOnInit() {
        this.searchSubscription = this.searchText$.pipe(
            debounceTime(SearchInputComponent.DEBOUNCE_TIME),
            distinctUntilChanged(),
            filter((value) => this.filterFn(value)),
            tap((value) => {
                this.search.emit(value);
            })
        ).subscribe();
    }

    ngOnDestroy() {
        this.searchSubscription?.unsubscribe();
    }

    private filterFn(value: string): boolean {
        return value.length >= SearchInputComponent.MIN_LENGTH && !SearchInputComponent.BANNED_WORDS.includes(value);
    }
}
