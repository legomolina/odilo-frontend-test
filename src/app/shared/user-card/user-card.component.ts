import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import ColorThief from 'colorthief';
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { User } from "../../user/list/models/user.model";

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
    private static readonly MIN_SCORE = 20;

    private readonly colorThief = new ColorThief();

    @Input() user!: User;
    @ViewChild('avatarImage') avatarImage!: ElementRef<HTMLImageElement>;

    readonly github = faGithub;
    headerColor = signal<string>('rgb(0 0 0)');
    githubColor = signal<string>('rgb(255 255 255)');

    handleLoad() {
        const [ r, g, b ] = this.colorThief.getColor(this.avatarImage.nativeElement);
        this.headerColor.set(`rgb(${r} ${g} ${b})`);

        if (this.useDarkColor(r, g, b)) {
            this.githubColor.set(`var(--dark-color)`);
        } else {
            this.githubColor.set(`var(--text-color)`);
        }
    }

    handleClick(event: Event) {
        if (this.user.score < UserCardComponent.MIN_SCORE) {
            event.preventDefault();
        }
    }

    // @see https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
    private useDarkColor(r: number, g: number, b: number) {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186;
    }
}
