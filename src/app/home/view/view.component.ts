import { Component } from '@angular/core';
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { searchStore } from "../search/store/search.store";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ModalService } from "../../core/services/modal/modal.service";

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})
export class ViewComponent {
    readonly githubIcon = faGithub;
    readonly starIcon = faStar;
    readonly searchStore = searchStore;

    constructor(private readonly modalService: ModalService) {
    }

    closeModal() {
        this.modalService.dismiss();
    }

    handleGoToGithubProfile() {
        window.open(this.searchStore.selectedUser?.url, '_blank');
    }
}
