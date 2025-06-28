import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoaderService } from "./loader.service";
import { catchError, finalize, Observable, throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  private readonly SKIP_LOADER = 'loader_spinner';

  constructor(private spinnerService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log("intercepted")
    if(req.headers.has(this.SKIP_LOADER)) {
      console.log("intercepted")
      req.headers.delete(this.SKIP_LOADER);
      return next.handle(req);
    } else {
            console.log("intercepted2")

      this.requests.push(req);
      this.spinnerService.showSpinner();
      return next.handle(req).pipe(
        catchError((err)=>{
          return throwError(()=>err);
        }),
        finalize(()=>this.removeRequest(req))
      );
    }
  }

  private removeRequest(req: HttpRequest<any>) {
    const index: number = this.requests.indexOf(req);
    if(index !== -1){
      this.requests.splice(index, 1);
    }
    this.requests.length > 0 ? this.spinnerService.showSpinner() : this.spinnerService.hideSpinner();
  }
}
