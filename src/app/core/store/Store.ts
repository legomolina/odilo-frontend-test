import { signal, type WritableSignal } from "@angular/core";

export type UpdateFn<T> = (state: T) => T;

export class Store<T> {
    protected readonly store: WritableSignal<T>;

    get signal() {
        return this.store.asReadonly();
    }

    constructor(protected readonly initialState: T) {
        this.store = signal(initialState);
    }

    clearStore(): void {
        this.store.set(this.initialState);
    }

    update(updater: UpdateFn<T>): void {
        this.store.update(updater);
    }
}
