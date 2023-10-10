import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { GithubTokenInterceptor } from "./interceptors/github-token.interceptor";



@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: GithubTokenInterceptor,
            multi: true
        }
    ]
})
export class CoreModule { }
