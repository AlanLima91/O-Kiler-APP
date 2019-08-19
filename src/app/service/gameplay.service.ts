import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameplayService {
  url = 'https://o-killer.herokuapp.com/';

  constructor(private http: HttpClient) { }

  /**
   *  Retrieve all Gameplays
   *  return a table of gameplay
   */
  getGameplays(): Observable<any> {
    return this.http.get<any>(this.url + 'gameplays').pipe(tap(data => {
      data
    }),
      catchError(this.handleError('getGameplays', [])))
  }

  /**
   *  Read all Gameplays and look for one gameplay
   *  return a gameplay
   */
  getGameplay(key: string): Observable<any> {
    return this.http.get<any>(this.url + 'gameplay/' + key);
  }

  /**
   *  Add a new Gameplay to the table
   *  @param Gameplay
   *  @return Observable
   */
  postGameplay(gameplay: any): Observable<any> {
    return this.http.post<any>(this.url + 'gameplay', gameplay).pipe(
      tap((gameplay: any) => console.log('Gameplay Added')),
      catchError(this.handleError<any>('addGameplay')),
    );
  }

  deleteGameplay(key: string): Observable<any> {
    return this.http.delete<any>(this.url + 'gameplay/' + key).pipe(
      tap((gameplay: any) => console.log('Gameplay deleted')),
      catchError(this.handleError<any>('deleteGameplay')),
    );
  }

  updateGameplay(key: string, gameplay: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.patch<any>(this.url + 'gameplay/' + key, gameplay, httpOptions).pipe(
      tap((gameplay: any) => console.log('Gameplay updated')),
      catchError(this.handleError<any>('updateGameplay')),
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for gameplay consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return (error);
    };
  }
}
