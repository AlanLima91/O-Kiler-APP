import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'https://o-killer.herokuapp.com/';

  constructor(private http: HttpClient) { }

  /**
   *  Retrieve all Users
   *  return a table of user
   */
  getUsers(): Observable<any>
  {
    return this.http.get<any>(this.url + 'users').pipe(tap(data =>
      {
        data
      }),
      catchError(this.handleError('getUsers', [])))
  }

  /**
   *  Read all Users and look for one user
   *  return a user
   */
  getUser(key: string): Observable<any>
  {
    return this.http.get<any>(this.url + 'user/' + key);
  }

  /**
   *  Add a new User to the table
   *  @param User
   *  @return Observable
   */
  postUser(user: any): Observable<any>
  {
    return this.http.post<any>(this.url + 'user', user, {responseType: 'json'}).pipe(
        tap((user: any) => console.log('User Added')),
        catchError(this.handleError<any>('addUser')),
      );
  }

  deleteUser(key: string): Observable<any>
  {
    return this.http.delete<any>(this.url + 'user/' + key).pipe(
      tap((user: any) => console.log('User deleted')),
      catchError(this.handleError<any>('deleteUser')),
    );
  }

  updateUser(key: string, user: any): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept':  'application/json'
      })
    };
    return this.http.patch<any>(this.url + 'user/' + key, user,httpOptions).pipe(
      tap((user: any) => console.log('User updated')),
      catchError(this.handleError<any>('updateUser')),
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

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return (error);
    };
  }
}
