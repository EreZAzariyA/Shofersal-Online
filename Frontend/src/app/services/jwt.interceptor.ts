import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthState } from '../redux/auth-state';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authState: AuthState) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        if (this.authState.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + this.authState.token
                }
            });
        }

        return next.handle(request);
    }
}
