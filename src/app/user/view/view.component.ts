import { Component } from '@angular/core';
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ModalService } from "../../core/services/modal/modal.service";
import { listStore } from "../list/store/list.store";

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})
export class ViewComponent {
    readonly githubIcon = faGithub;
    readonly starIcon = faStar;
    readonly listStore = listStore;

    constructor(private readonly modalService: ModalService) {
    }

    closeModal() {
        this.modalService.dismiss();
    }

    handleGoToGithubProfile() {
        window.open(this.listStore.selectedUser?.url, '_blank');
    }
}
