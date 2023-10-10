import { animate, style, transition, trigger } from "@angular/animations";

export const fadeOut = trigger('fadeOut', [
    transition(':leave', [
        style({
            opacity: 1
        }),
        animate('.3s ease-out', style({
            opacity: 0
        }))
    ])
]);
