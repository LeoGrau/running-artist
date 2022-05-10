import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, retry, throwError } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class OffersApiService {

  port = 3000;
  basePath = `http://localhost:${this.port}/offers`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error ocurred: ${error.error.message}`);
    } else {
      console.error(
        `Backend return code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError(() => new Error(`Something happened with request, please try again later`));
  }


  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Object>(this.basePath, this.httpOptions).
      pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getById(id: number) {
    return this.http.get<Object>(`${this.basePath}/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));;
  }

  update(id: number, item: any) {
    return this.http.put<Object>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));;
  }

  delete(id: any) {
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  create(item: any) {
    return this.http.post<Object>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}
