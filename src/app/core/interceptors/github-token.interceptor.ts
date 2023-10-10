import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";

@Injectable()
export class GithubTokenInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<unknown>, /**/next: HttpHandler): Observable<HttpEvent<unknown>> {
        const newRequest = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${environment.GITHUB_TOKEN}`),
        });
        return next.handle(newRequest);
    }
}
