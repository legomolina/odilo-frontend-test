import {
    AfterViewInit,
    ApplicationRef,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    OnDestroy,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { fadeIn } from "../animations/fadeIn";
import { fadeOut } from "../animations/fadeOut";
import { Modal } from "./Modal";
import { Subject } from "rxjs";
import { AnimationEvent } from "@angular/animations";
import { faClose } from "@fortawesome/free-solid-svg-icons";

@Component({
    animations: [fadeIn, fadeOut],
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit, OnDestroy, Modal {
    component!: Type<any>;
    componentOptions!: any;
    modalRef!: ComponentRef<ModalComponent>;
    show = false;
    title!: string;
    onWillDismiss = new Subject<any>();
    onDidDismiss = new Subject<void>();

    readonly closeIcon = faClose;

    @ViewChild('modalContent', { read: ViewContainerRef }) modalContent!: ViewContainerRef;

    private componentRef?: ComponentRef<Type<any>>;

    constructor(
        private appRef: ApplicationRef,
        private cdRef: ChangeDetectorRef,
    ) {
    }

    ngOnDestroy(): void {
        this.componentRef?.destroy?.();
    }

    fadeOutDone(event: AnimationEvent): void {
        if (event.toState === 'void') {
            this.onDidDismiss.next();

            // Remove modal element
            this.appRef.detachView(this.modalRef.hostView);
            this.modalRef.destroy();
        }
    }

    dismiss(data?: any): void {
        this.show = false;
        this.onWillDismiss.next(data);
    }

    present(): void {
        this.show = true;
    }

    ngAfterViewInit(): void {
        this.modalContent.clear();

        const componentRef = this.modalContent.createComponent(this.component);

        const { instance } = componentRef;

        Object.assign(instance, this.componentOptions);

        this.componentRef = instance;

        this.cdRef.detectChanges();
    }
}
