import {
    ApplicationRef, createComponent,
    EmbeddedViewRef, EnvironmentInjector,
    Injectable,
} from "@angular/core";
import { Modal, ModalOptions } from "../../../shared/modal/Modal";
import { ModalComponent } from "../../../shared/modal/modal.component";

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private lastOpenModal?: Modal;

    constructor(
        private appRef: ApplicationRef,
        private environmentInjector: EnvironmentInjector,
    ) {
    }

    create({ component, componentOptions, title }: ModalOptions): Modal {
        const componentRef = createComponent(ModalComponent, {
            environmentInjector: this.environmentInjector
        });

        const { instance } = componentRef;

        instance.modalRef = componentRef;
        instance.component = component;
        instance.componentOptions = componentOptions;
        instance.title = title ?? '';

        this.appRef.attachView(componentRef.hostView);
        this.lastOpenModal = instance as Modal;

        const domElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

        document.body.append(domElement);

        return instance as Modal;
    }

    dismiss(data?: any) {
        this.lastOpenModal?.dismiss(data);
    }
}
