import { Subject } from "rxjs";
import { Type } from "@angular/core";

export interface ModalOptions {
    component: Type<any>;
    componentOptions?: any;
    title?: string;
}

export interface Modal {
    onWillDismiss: Subject<any>;
    onDidDismiss: Subject<void>;

    dismiss(data?: any): void;
    present(): void;
}
