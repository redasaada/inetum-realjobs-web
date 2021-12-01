import { HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class UniversalAppInterceptor implements HttpInterceptor {

  constructor( private authService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log(req.url);
        console.log(req.url.includes('/signUp'));
        if (!req.url.includes('/login') && !req.url.includes('/signUp')) {
            const idToken = localStorage.getItem("id_token");

            if (idToken) {
                const cloned = req.clone({
                    headers: req.headers.set("Authorization",
                        "Bearer " + idToken)
                });

                return next.handle(cloned);
            }
        }
        return next.handle(req);
  }
}