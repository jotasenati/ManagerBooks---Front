import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { SalesBook } from '../../models/salesBook';

@Injectable({
  providedIn: 'root'
})
export class SalesBookService {

  url = 'https://localhost:44313/api/SalesBooks'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Content-Type': 'application/json' 
      }
  }

  // Obtem todos os carros
  getSalesBook(): Observable<SalesBook[]> {
    return this.httpClient.get<SalesBook[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um carro pelo id
  getSalesBookById(id: number): Observable<SalesBook> {
    return this.httpClient.get<SalesBook>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um carro
  saveSalesBook(salesBook: SalesBook): Observable<SalesBook> {
    return this.httpClient.post<SalesBook>(this.url, JSON.stringify(salesBook), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um carro
//   + '/' + book.id, JSON.stringify(book)
  updateSalesBook(salesBook: SalesBook): Observable<SalesBook> {
    return this.httpClient.put<SalesBook>(this.url+ '/' + salesBook.salesBookId, JSON.stringify(salesBook), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um carro
  deleteSalesBook(salesBook: SalesBook) {
    return this.httpClient.delete<SalesBook>(this.url + '/' + salesBook.salesBookId, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}